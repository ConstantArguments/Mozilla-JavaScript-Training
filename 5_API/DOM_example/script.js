// change link text and ref in first <a>
let link = document.querySelector("a");
link.textContent = "Mozilla Developer Network";
link.href = "https://developer.mozilla.org";

// create <p> in first <section.
let sect = document.querySelector("section");
let para = document.createElement("p");
// add text to new <p>
para.textContent = "We hope you enjoy this ride.";
sect.appendChild(para);

// add a text node to the paragraph the link sits inside, first <p>
let text = document.createTextNode(" - the premier source forthe premier source for web development knowledge.");
// grab a reference to the paragraph the link is inside, and append the text node to it
let linkPara = document.querySelector("p");
linkPara.appendChild(text);

/* un-comment the following individualy and referesh browser to see changes.
***********************************************************/

// // move the paragraph with the link inside it to the bottom of the section
// sect.appendChild(linkPara);


// // Remove a node when you have a reference to the node
// sect.removeChild(linkPara);


// // no method to tell a node to remove itself, so you'd have to do the folowing:
//    // remove a node based only on a reference to itself
// linkPara.parentNode.removeChild(linkPara);


// // set properties of this object to directly update element styles
// para.style.color = 'white';
// para.style.backgroundColor = 'black'; // JS uses camel case of backgroundColor vs css hyphen of background-color
// para.style.padding = '10px';
// para.style.width = '250px';
// para.style.textAlign = 'center';


// // // add a class which can be used with css
// para.setAttribute('class', 'highlight');
// // // remove a class or other attribute
// para.removeAttribute('class', 'highlight');
