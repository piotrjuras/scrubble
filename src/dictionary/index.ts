const tidy = (text) => {
    const polishWordsWithoutEnter = text.replace(/(\r\n|\n|\r)/gm, ",").replace(/\s/g, '').trim();

    const final = polishWordsWithoutEnter.split(',').filter(word => word !== "").filter(word => word.length <= 15).filter(word => !/[A-Z]/.test(word));

    const download = (filename, text) => {
        let element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);
      
        element.style.display = 'none';
        document.body.appendChild(element);
      
        element.click();
      
        document.body.removeChild(element);
    }

    const object = {
        words2: final.filter(word => word.length === 2),
        words3: final.filter(word => word.length === 3),
        words4: final.filter(word => word.length === 4),
        words5: final.filter(word => word.length === 5),
        words6: final.filter(word => word.length === 6),
        words7: final.filter(word => word.length === 7),
        words8: final.filter(word => word.length === 8),
        words9: final.filter(word => word.length === 9),
        words10: final.filter(word => word.length === 10),
        words11: final.filter(word => word.length === 11),
        words12: final.filter(word => word.length === 12),
        words13: final.filter(word => word.length === 13),
        words14: final.filter(word => word.length === 14),
        words15: final.filter(word => word.length === 15)
    }

    for(let key in object){
        console.log(object[key]);
        download(key, object[key]);
    }

    console.log(JSON.stringify(final));
}

export default () => {

    const myRequest = new Request('/odm.txt');
    fetch(myRequest)
    .then((response) => response.text())
    .then((text) => {
      tidy(text);
    });

}