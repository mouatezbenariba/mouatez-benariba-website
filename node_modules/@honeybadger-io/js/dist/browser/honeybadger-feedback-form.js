(function (window, document) {
  // eslint-disable-next-line quotes
  const TEMPLATE = `<style>
    #honeybadger-feedback-wrapper {
        display: block;
        outline: none;
        position: fixed;
        z-index: 999;
        width: 100%;
        height: 100%;
        text-align: center;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.6);
        overflow: auto;
    }

    #honeybadger-feedback {
        font-family: system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        padding: 1em 3em 1em 2em;
        max-width: 400px;
        max-height: 80%;
        margin: 4% auto 0;
        text-align: left;
        background: #1a202c;
        color: #9CA3AF;
        border-radius: 5px;
    }
    #honeybadger-feedback-name, #honeybadger-feedback-email, #honeybadger-feedback-comment { width: 100%; padding: 0.5em; }
    #honeybadger-feedback-comment {
        font-family: inherit;
        height: 10em;
    }

    #honeybadger-feedback-error {
        color: #cc0000;
    }

    #honeybadger-feedback-error-detail {
        font-size: small;
    }

    .honeybadger-feedback-button {
        color: initial;
        padding: 0.5em 1em;
        cursor: pointer;
    }

    .honeybadger-feedback-button.plain {
        text-decoration: underline;
        border: none;
        background: none;
        color: #9CA3AF;
    }

    #honeybadger-feedback-close {
        padding-left: 0;
    }

    #honeybadger-feedback-footer {
        text-align: right;
    }
    #honeybadger-feedback-footer img {
        vertical-align: middle;
    }
    #honeybadger-feedback-link {
        text-decoration: underline;
        color: #9CA3AF;
    }

    @media screen and (max-height: 570px) {
        #honeybadger-feedback {
            max-height: none;
            margin-top: 0;
        }
    }

    @media screen and (max-height: 660px) {
        #honeybadger-feedback {
            max-width: none;
        }
    }
</style>

<div id="honeybadger-feedback">

    <h2 id="honeybadger-feedback-heading">
        Care to help us fix this?
    </h2>

    <p id="honeybadger-feedback-explanation">
        Any information you can provide will help our technical team get to the bottom of this issue.
    </p>

    <div id="honeybadger-feedback-thanks" style="display:none;">
        <p><strong>Thanks for the feedback!</strong></p>
        <input type="button" class="honeybadger-feedback-button plain" id="honeybadger-feedback-close" value="Close">
    </div>

    <form id="honeybadger-feedback-form">
        <p>
            <label for="honeybadger-feedback-name" id="honeybadger-feedback-label-name">
                Name
            </label><br>
            <input type="text" name="name" id="honeybadger-feedback-name">
        </p>

        <p>
            <label for="honeybadger-feedback-email" id="honeybadger-feedback-label-email">
                Your email address
            </label><br>
            <input type="email" name="email" id="honeybadger-feedback-email" value="">
        </p>

        <p>
            <label for="honeybadger-feedback-comment" id="honeybadger-feedback-label-comment">
                Comment (required)
            </label><br>
            <textarea name="comment" id="honeybadger-feedback-comment" cols="50" rows="6" required></textarea>
        </p>

        <p id="honeybadger-feedback-error" style="display: none">
            There was an error. Please try again later.
            <br/>
            <span id="honeybadger-feedback-error-detail"></span>
        </p>

        <p>
            <input type="submit" class="honeybadger-feedback-button" id="honeybadger-feedback-submit" value="Send">
            <input type="button" class="honeybadger-feedback-button plain" id="honeybadger-feedback-cancel" value="Cancel">
        </p>
    </form>

    <p id="honeybadger-feedback-footer">
        <a id="honeybadger-feedback-link" href="https://www.honeybadger.io/" target="_blank" title="Exception, uptime, and performance monitoring for PHP.">
            Powered by
            <img src="https://www.honeybadger.io/images/navbar_logo.svg?1670031500" width="100"/>
        </a>
    </p>
</div>
`
  const OPTIONS_KEY = 'honeybadgerUserFeedbackOptions'

  const HoneybadgerUserFeedbackForm = function () {};
  HoneybadgerUserFeedbackForm.prototype.build = function () {
    const self = this
    self.element = document.createElement('div')
    self.element.id = 'honeybadger-feedback-wrapper'
    self.element.innerHTML = TEMPLATE
    self.element.onclick = function (e) {
      if (e.target !== self.element) return;
      self.close();
    }

    document.body.appendChild(self.element)

    self.form = self.element.getElementsByTagName('form')[0]
    self.form.addEventListener('submit', function (e) {
      e.preventDefault()
      self.submit()
    })

    const cancelButton = document.getElementById('honeybadger-feedback-cancel')
    cancelButton.onclick = (e) => {
      e.preventDefault()
      self.close()
    }
    const closeButton = document.getElementById('honeybadger-feedback-close')
    closeButton.onclick = (e) => {
      e.preventDefault()
      self.close()
    }

    self.applyLabelsFromOptions()
  };

  HoneybadgerUserFeedbackForm.prototype.applyLabelsFromOptions = function () {
    const self = this

    const formOptions = self.getOptions()
    const { messages = {}, buttons = {}, labels = {} } = formOptions
    for (let key in messages) {
      const element = document.getElementById(`honeybadger-feedback-${key}`)
      if (element) {
        element.innerText = messages[key]
      }
    }
    for (let key in labels) {
      const element = document.getElementById(`honeybadger-feedback-label-${key}`)
      if (element) {
        element.innerText = labels[key]
      }
    }
    for (let key in buttons) {
      const element = document.getElementById(`honeybadger-feedback-${key}`)
      if (element) {
        element.value = buttons[key]
      }
    }
  };

  HoneybadgerUserFeedbackForm.prototype.close = function () {
    const self = this
    self.element.parentNode.removeChild(self.element);
  };

  HoneybadgerUserFeedbackForm.prototype.submit = function () {
    const self = this
    if (self.loading) return

    self.loading = true
    document.getElementById('honeybadger-feedback-error').style.display = 'none'
    document.getElementById('honeybadger-feedback-submit').disabled = true

    const script = document.createElement('script')
    const form = document.getElementById('honeybadger-feedback-form')
    script.src = self.getEndpoint() +
        '?format=js' +
        `&api_key=${self.getApiKey()}` +
        `&token=${self.getLastNoticeId()}` +
        `&name=${encodeURIComponent(self.form.name.value)}` +
        `&email=${encodeURIComponent(self.form.email.value)}` +
        `&comment=${encodeURIComponent(self.form.comment.value)}`
    script.onerror = function () {
      self.loading = false
      // unfortunately we don't get any info here about the error (i.e. HTTP 403)
      self.onFormError('')
      // remove script so that user can try again
      form.removeChild(script)
    }
    form.appendChild(script);
  };

  HoneybadgerUserFeedbackForm.prototype.onSuccess = function () {
    document.getElementById('honeybadger-feedback-thanks').style.display = 'block'
    document.getElementById('honeybadger-feedback-form').style.display = 'none'
    document.getElementById('honeybadger-feedback-submit').disabled = false
  };

  HoneybadgerUserFeedbackForm.prototype.onFormError = function (message) {
    document.getElementById('honeybadger-feedback-error').style.display = 'block'
    document.getElementById('honeybadger-feedback-error-detail').innerText = message
    document.getElementById('honeybadger-feedback-submit').disabled = false
  };

  HoneybadgerUserFeedbackForm.prototype.getOptions = function () {
    return window[OPTIONS_KEY]
  }

  HoneybadgerUserFeedbackForm.prototype.getApiKey = function () {
    return this.getOptions().apiKey
  }

  HoneybadgerUserFeedbackForm.prototype.getLastNoticeId = function () {
    return this.getOptions().noticeId
  }

  HoneybadgerUserFeedbackForm.prototype.getEndpoint = function () {
    return this.getOptions().endpoint
  }

  const form = new HoneybadgerUserFeedbackForm()
  form.build()

  // this function needs to be defined and will be called from the feedback script submission
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  window['honeybadgerFeedbackResponse'] = function honeybadgerFeedbackResponse(data) {
    form.loading = false

    if (data['result'] === 'OK') {
      form.onSuccess()

      return
    }

    form.onFormError(data['error'] || 'An unknown error occurred.')
  }
})(window, document)
