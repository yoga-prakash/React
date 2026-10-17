import { useState, useEffect } from "react";

export default function App() {
  const [meme, setMeme] = useState({
    topText: "One does not simply",
    bottomText: "Walk into mordor",
    imageUrl: "/starterImage.png",
  });

  const [imageArray, setImage] = useState([]);

  function typeText(event) {
    const { value, name } = event.currentTarget;
    setMeme(prevMeme => ({ ...prevMeme, [name]: value }));
  };

  useEffect(() => {
    async function getData() {
      const result = await fetch("https://api.imgflip.com/get_memes");
      const data = await result.json();
      setImage((prevImageArray) => [...prevImageArray, ...data.data.memes])
    };
    getData();
  }, []);

  function changeImage() {
    if (imageArray.length === 0) return;
    const randomNumber = Math.floor(Math.random() * imageArray.length);
    setMeme((prevMeme) => ({
      ...prevMeme,
      imageUrl: imageArray[randomNumber].url,
    }));
  };

  return (
    <>
      <header>
        <img src="/troll-face.png" alt="troll-face" />
        <h1>Meme Generator</h1>
      </header>
      <main>
        <form>
          <label> Top Text
            <input type="text" name="topText" onChange={typeText} value={meme.topText} />
          </label>
          <label> Bottom Text
            <input type="text" name="bottomText" onChange={typeText} value={meme.bottomText} />
          </label>
        </form>
        <button onClick={changeImage}>Get new image</button>
        <div className="meme">
          <span>{meme.topText}</span>
          <img src={meme.imageUrl} alt="meme-image" />
          <span>{meme.bottomText}</span>
        </div>
      </main>
    </>
  );
};  