const body = document.querySelector('body');

/*
    Generates an HTML element from a template string. Useful for customizing HTML Elements in a more visually pleasing way.
*/
const generateHTML = (str) => {
    // Older browsers don't support DOMParser, so check to make sure.
    const support = (function () {
      if (!window.DOMParser) return false;
      var parser = new DOMParser();
      try {
          parser.parseFromString('x', 'text/html');
      } catch (err) {
          console.trace(err);
          return false;
      }
      return true;
    })();
  
    if (support) {
        var parser = new DOMParser();
        var doc = parser.parseFromString(str, 'text/html');
        return doc.body.children[0];
    }
    var dom = document.createElement('div');
    dom.innerHTML = str;
    return dom.children[0];
}

// Display 'Hello World'
body.append(generateHTML('<p>Hello World</p>'));

// Making interactive elements.
let button = generateHTML('<button>Click me!</button>');
button.onclick = () => console.log("Ya clicked me didn't ya!");

body.append(button);

/*
    Nesting 'generateHTML' calls.
*/
let form = generateHTML(`
    <form action='javascript:void(0);'>
        ${generateHTML('<input id="name-input" type="text" placeholder="Name">').outerHTML}
        ${generateHTML('<input id="addr-input" type="text" placeholder="Address">').outerHTML}
        ${generateHTML('<button id="submit-btn" type="submit">Submit</button>').outerHTML}
    </form>
`);

let name = form.querySelector('#name-input');
let addr = form.querySelector('#addr-input');
let submitBtn = form.querySelector('#submit-btn');
submitBtn.onclick = () => console.log(`${name.value}, ${addr.value}`);

body.append(form);


/*
    Applying conditional checks to display different elements, taken from my 'Endless Runner' project.
*/
const endCardTemplate = (state, points) => {
    let endCardDiv = generateHTML(`
        <div class="end-card end-card-animation">
            <h2>
                ${
                    state === 'WIN'
                    ? 'You Win!'
                    : 'You Lose!'
                }
            </h2>
            <div class="end-score"><h2>Score: ${points}</h2></div>
            <div class="controls">
                ${
                    state === 'WIN'
                    ? generateHTML('<button id="next-level-btn"><h2>Next Level</h2></button>').outerHTML
                    : generateHTML('<button id="restart-btn"><h2>Restart</h2></button>').outerHTML
                }
            </div>
        </div>
    `);

    let nextLevelBtn = endCardDiv.querySelector('#next-level-btn');
    if (nextLevelBtn !== null) {
        nextLevelBtn.addEventListener('click', () => console.log('Starting next level...'));
        console.log(nextLevelBtn);
    }

    let restartBtn = endCardDiv.querySelector('#restart-btn');
    if (restartBtn !== null) {
        restartBtn.addEventListener('click', () => console.log('Restarting level...'));
        console.log(restartBtn);
    }

    return endCardDiv;
}

body.append(endCardTemplate('WIN', 100));
body.append(endCardTemplate('LOSE', 100));