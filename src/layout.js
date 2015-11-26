export default function(title, body) {
  return `<!doctype html>
<html lang="en">
<head>
  <link rel="stylesheet" href="/public/fonts.css">
  <link rel="stylesheet" href="/public/app.css">
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>
  <title>${title}</title>
</head>
<body>
  <nav><img class="logo" src="/public/images/logo.png"></nav>
  ${body}
  <div class="container">
    <section class="comments">
      <div class="comment-summary">
        <h2>5 Comments</h2>
        <div class="add-comment-box">
          <div class="author"><div class="avatar avatar-4">M</div></div>
          <div class="add-comment-container">
            <div class="comment-header">
              <div class="author-name">
                Marcus
              </div>
            </div>
            <div class="textarea-container">
              <div class="textarea" contenteditable></div>
            </div>
            <div class="comment-options">
              <div class="button pull-right">Post Comment</div>
            </div>
          </div>
        </div>
      </div>
      <div class="separator">&middot;&nbsp;&middot;&nbsp;&middot;</div>
      <div class="comment has-replies">
        <div class="author"><div class="avatar avatar-1">B</div></div>
        <div class="comment-container">
          <div class="comment-header">
            <div class="comment-timestamp pull-right">
              14 minutes ago
            </div>
            <div class="author-name">
              Brendan
            </div>
          </div>
          <div class="comment-text">
            <p>I think one of the more frustrating aspects of the Jets recent slump over the last five games is made more alarming by the recurring pattern behind it. Team gets off to a sluggish start, looks unprepared. At least one unit... it varies week to week... seems <strong>totally</strong> lost in space and the others cannot compensate for it.</p>
            <p>That fragility, or lack of mental toughness, surfaces, and the team falls behind early.</p>
          </div>
          <div class="comment-options">
            <div class="button pull-right">Reply</div>
          </div>
        </div>
      </div>
      <div class="reply">
        <div class="comment fork has-replies">
          <div class="author"><div class="avatar avatar-2">A</div></div>
          <div class="comment-container">
            <div class="comment-header">
              <div class="comment-timestamp pull-right">
                10 minutes ago
              </div>
              <div class="author-name">
                a57se
              </div>
            </div>
            <div class="comment-text">
              <p>You're a lying liar from liarville and I can't even read this without throwing up.</p>
            </div>
            <div class="comment-options">
              <div class="button pull-right">Reply</div>
            </div>
          </div>
        </div>
      </div>
      <div class="reply">
        <div class="reply">
          <div class="comment fork has-replies">
            <div class="author"><div class="avatar avatar-7">L</div></div>
            <div class="comment-container">
              <div class="comment-header">
                <div class="comment-timestamp pull-right">
                  3 minutes ago
                </div>
                <div class="author-name">
                  levi
                </div>
              </div>
              <div class="comment-text">
                <p>That's a little rude, don't you think? We're here to talk about the Jets, ya'know.</p>
              </div>
              <div class="comment-options">
                <div class="button pull-right">Reply</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="reply">
        <div class="reply">
          <div class="reply">
            <div class="comment fork">
              <div class="author"><div class="avatar avatar-1">B</div></div>
              <div class="comment-container">
                <div class="comment-header">
                  <div class="comment-timestamp pull-right">
                    1 minute ago
                  </div>
                  <div class="author-name">
                    Brendan
                  </div>
                </div>
                <div class="comment-text">
                  <p>Eh, it's cool. Sunday's game made me puke too.</p>
                </div>
                <div class="comment-options">
                  <div class="button pull-right">Reply</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="reply">
        <div class="reply">
          <div class="comment child">
            <div class="author"><div class="avatar avatar-2">A</div></div>
            <div class="comment-container">
              <div class="comment-header">
                <div class="comment-timestamp pull-right">
                  2 minutes ago
                </div>
                <div class="author-name">
                  a57se
                </div>
              </div>
              <div class="comment-text">
                <p>Fair enough. Fitzpatrick is the best QB of all time.</p>
              </div>
              <div class="comment-options">
                <div class="button pull-right">Reply</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="reply">
        <div class="comment child">
          <div class="author"><div class="avatar avatar-3">T</div></div>
          <div class="comment-container">
            <div class="comment-header">
              <div class="comment-timestamp pull-right">
                5 minutes ago
              </div>
              <div class="author-name">
                tsjc68
              </div>
            </div>
            <div class="comment-text">
              <p><em>Insert witty gif here.</em></p>
            </div>
            <div class="comment-options">
              <div class="button pull-right">Reply</div>
            </div>
          </div>
        </div>
      </div>
      <div class="comment child">
        <div class="author"><div class="avatar avatar-4">M</div></div>
        <div class="comment-container">
          <div class="comment-header">
            <div class="comment-timestamp pull-right">
              12 minutes ago
            </div>
            <div class="author-name">
              Marcus
            </div>
          </div>
          <div class="comment-text">
            <p>This is my incredibly insightful reply to your comment.</p>
          </div>
          <div class="comment-options">
            <div class="button pull-right">Reply</div>
          </div>
        </div>
      </div>
      <div class="comment">
        <div class="author"><div class="avatar avatar-5">B</div></div>
        <div class="comment-container">
          <div class="comment-header">
            <div class="comment-timestamp pull-right">
              15 minutes ago
            </div>
            <div class="author-name">
              Bent
            </div>
          </div>
          <div class="comment-text">
            <p>I hope you like my BGA!</p>
          </div>
          <div class="comment-options">
            <div class="button pull-right">Reply</div>
          </div>
        </div>
      </div>
    </section>
  </div>
  <script src="/public/app.js"></script>
</body>
</html>`;
}
