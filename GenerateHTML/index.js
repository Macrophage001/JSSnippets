const body = document.querySelector('body');

/*
    Generates an HTML element from a template string. Useful for customizing HTML Elements in a more visually pleasing way.
*/
const generateHTML = (str) => {
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
    return dom;
}

// Display 'Hello World'
body.append(generateHTML('<p>Hello World</p>'));

// Making interactive elements.
let button = generateHTML('<button>Click me!</button>');
button.onclick = () => console.log("Ya clicked me didn't ya!");

body.append(button);

// Nesting 'generateHTML' calls.
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