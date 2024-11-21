import React, { useState } from "react";

const Home = () => {
  const [month, setMonth] = useState(1);
  const [news, setNews] = useState(null);

  const handleInput = async (event) => {
    setMonth(event.target.value);
  };

  // const fetchArticles = async (event) => {
  //   if (event) {
  //     event.preventDefault();
  //   }
  //   try {
  //     const response = await fetch(
  //       `https://api.nytimes.com/svc/archive/v1/2024/${month}.json?api-key=${apiKey}`
  //     );
  //     if (!response.ok) throw new Error(`Error fetching data`);
  //     const data = await response.json();
  //     setNews(data.response.docs);
  //     console.log(data);
  //     console.log(data.response);
  //   } catch (error) {
  //     console.error(error.message);
  //   }
  // };

  const fetchArticles = (event) => {
    if (event) {
      event.preventDefault();
    }
    fetch(`${process.env.REACT_APP_API_URL}?month=${month}`)
      .then((response) => {
        if (!response.ok) throw new Error("Error fetching data");
        return response.json();
      })
      .then((data) => {
        setNews(data.response.docs);
        console.log(data);
        console.log(data.response);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  // useEffect(() => {
  //   fetchArticles();
  // }, []);

  return (
    <div>
      <h2>NY Times Articles</h2>
      <form className="searchArticles">
        <input type="text" name="month" id="month" onChange={handleInput} />
        <button onClick={fetchArticles}>Search</button>
      </form>
      {news && (
        <div>
          {news.map((news, index) => (
            <div key={index}>
              <h2>{news.headline.main}</h2>
              <p>{news.abstract}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
