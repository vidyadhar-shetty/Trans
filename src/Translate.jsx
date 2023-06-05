import { useEffect, useState } from "react";

const Translate = () => {

   let[languages , setLanguages] = useState(null);
   let[translatedText , settranslatedText] = useState("");


    useEffect( ()=>{
        const url = 'https://google-translate1.p.rapidapi.com/language/translate/v2/languages';
        const options = {
            method: 'GET',
            headers: {
                "content-type": "application/octet-stream",
                "Accept-Encoding": "application/gzip",
                "X-RapidAPI-Key": "93fcc5cd9emsh513a31df0936dbcp11f55cjsn097f0b87669b",
                "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
            } 
        };
        fetch(url , options)
        .then((res)=>{return res.json()})
        .then((googledata)=>{ setLanguages( googledata.data.languages );   })
    } , [])

    let translate = ()=>{
        const url = 'https://google-translate1.p.rapidapi.com/language/translate/v2';
        const options = {
            method: 'POST',
            headers: {
                "content-type": "application/x-www-form-urlencoded",
                "Accept-Encoding": "application/gzip",
                "X-RapidAPI-Key": "93fcc5cd9emsh513a31df0936dbcp11f55cjsn097f0b87669b",
                "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
              },
            body: new URLSearchParams({
                q: document.getElementById("input").value ,
                target: document.getElementById("lang").value  ,
                source: 'en'
            })
        };

        fetch(url , options)
        .then((res)=>{return res.json()})
        .then((data)=>{
            console.log(data.data.translations[0].translatedText)
            settranslatedText(data.data.translations[0].translatedText)})
    }


    return ( 
        <div className="translate-page">
            <h1>Language Translator</h1>
            <hr />
            <textarea placeholder="enter text to traslate" id="input" cols="50" rows="7"></textarea>

           { languages!=null && <select id="lang">
                                    <option>--SELECT--</option>
                                    { languages.map((v,i)=>{ return(<option value={v.language} key={i}> { v.language } </option> ) }) }
                                </select>}

            <button onClick={translate}>Translate language</button>

            <textarea placeholder="traslated text" cols="500" rows="7" value={translatedText}>
                
            </textarea>
    
            <style jsx>{`
        .translate-page {
          max-width: 500px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f8f8f8;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        h1 {
          margin-bottom: 20px;
          color: #333;
          font-size: 28px;
          text-align: center;
          text-transform: uppercase;
        }

        hr {
          border: none;
          border-top: 1px solid #ccc;
          margin: 20px 0;
        }

        textarea {
          margin-bottom: 20px;
          padding: 10px;
          width: 90%;
          border: 1px solid #ccc;
          border-radius: 4px;
          resize: vertical;
          font-size: 16px;
        }

        select {
          margin-bottom: 20px;
          margin-left: 60px;
          padding: 10px;
          width: 70%;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 16px;
        }

        button {
          margin-bottom: 20px;
          padding: 12px 24px;
          margin-left: 105px;
          background-color: #4285f4;
          color: #fff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 18px;
          text-transform: uppercase;
          transition: background-color 0.3s ease;
        }

        button:hover {
          background-color: #3367d6;
        }

        #output {
          border: 1px solid #ccc;
          border-radius: 4px;
          padding: 10px;
          width: 100%;
          font-size: 16px;
        }
      `}</style>
    </div>
     );
}
 
export default Translate;