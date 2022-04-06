<div id="top"></div>


[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/Andrei123f/RELI-Front-end">
    <img src="https://github.com/Andrei123f/RELI-Front-end/blob/main/public/reli-logo.jpg" alt="Logo" width=400 height=300>
  </a>

  <h3 align="center">RenderLingo - API</h3>

  <p align="center">
    E-learning platform that evaluates the solution using ASTs(Abstract Syntax Trees) comparisons and unit testing.
    <br />
    **This is the RenderLingo API documentation. If you want to read the RendeLingo Portal documentation please click <a href="https://github.com/Andrei123f/RELI-Front-end">here</a>.**
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#how-does-it-work">How Does RenderLingo work</a></li>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project
This is the API for the <a href="https://github.com/Andrei123f/RELI-Front-end">RenderLingo Portal</a>. The API is responsible with the user auth, user account creation and challenge evaluation/retrieval. <br />
The project uses <a href="https://oauth.net/2/"><img src="https://oauth.net/images/oauth-2-sm.png" width=20 height=20>OAuth 2.0</a> flow for the user authentication and <a href="https://www.mongodb.com/"><img src="https://cdn.icon-icons.com/icons2/2415/PNG/512/mongodb_original_logo_icon_146424.png" width=20 height=20>MongoDB</a> for data storing.


### How Does RenderLingo work

<div id="how-does-it-work"></div>
⚙️ Once you submit a challenge solution, RELI's API will evaluate your solution and give you 3 values, P1, P2, C alongside with the tests failed and passed.
In short, P1 is a % of how similar is your solution to mine for that challenge, P2 is a % of how many tests your solution passed and C is a value calculated as C = 20%P1 + 80%P2. 
<br />
<br />
P1 is determined by comparing the ASTs(short for Abstract Syntax Trees) generated by your solution and my solution using the following distance algorithms The Levenshtein distance, Longest Common Subsequence(LCS), Metric Longest Common Subsequence(MLCS) and Cosine similarity.


### Built With
The major frameworks that I used: <br />
* <a href="https://expressjs.com/">Express.js</a> 
* <a href="https://nodejs.org/en/">Node.js</a> 
* <a href="https://jwt.io/">JWT token</a> 
* <a href="https://mongodb.github.io/node-mongodb-native/api-generated/mongoclient.html">MongoClient</a> 
<p align="right">(<a href="#top">back to top</a>)</p>




<!-- GETTING STARTED -->
## Getting Started
You will need npm and nodejs. You can get them from <a href="https://nodejs.org/en/download/">here</a>.

### Prerequisites

After installing npm and node you may run
  ```sh
  npm install npm@latest -g
  ```
to get the latest version of npm

### Installation
1. Clone the repo
   ```sh
   git clone https://github.com/Andrei123f/RELI-back-end.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Create a .env file and place the following value there
   ```js
   ATLAS_URI=mongo_db_url
   PASSWORD_SALT_ROUNDS=10
   ACCESS_TOKEN_SECRET=access_token_secret
   REFERESH_TOKEN_SECERET=refresh_token_secret
   ACCESS_TOKEN_EXP_H=1h
   REFRESH_TOKEN_EXP_M=29d
   ```
   mongo_db_url is your mongo db connection string <br /> 
   access_token_secret is your access token secret (please read the <a href="https://jwt.io/">JWT documentation</a> and <a href="https://oauth.net/2/">OAuth 2.0 documentation</a>) <br />
   refresh_token_secret is your refresh token secret (please read the <a href="https://jwt.io/">JWT documentation</a> and <a href="https://oauth.net/2/">OAuth 2.0 documentation</a>) <br />

   
4. Run the following command to start the project
   ```sh
   npm run devStart
   ```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->
## Usage
Anyone who wants to learn the basics of JavaScript, including Variables, Functions, Arrays and Objects, Classes, Object-oriented programming(OOP) can learn the fundamentals of these concepts in a unique and interesting way by translating a story to code.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Andrei Popa - [@andreispkpd](https://twitter.com/andreispkpd) - andrei.popabd@gmail.com

Project Link: [https://github.com/Andrei123f/RELI-back-end](https://github.com/Andrei123f/RELI-back-end)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/Andrei123f/RELI-back-end.svg?style=for-the-badge
[contributors-url]: https://github.com/Andrei123f/RELI-back-end/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Andrei123f/RELI-back-end.svg?style=for-the-badge
[forks-url]: https://github.com/Andrei123f/RELI-back-end/network/members
[stars-shield]: https://img.shields.io/github/stars/Andrei123f/RELI-back-end.svg?style=for-the-badge
[stars-url]: https://github.com/Andrei123f/RELI-back-end/stargazers
[issues-shield]: https://img.shields.io/github/issues/Andrei123f/RELI-back-end.svg?style=for-the-badge
[issues-url]: https://github.com/Andrei123f/RELI-back-end/issues
[license-shield]: https://img.shields.io/github/license/Andrei123f/RELI-back-end.svg?style=for-the-badge
[license-url]: https://github.com/Andrei123f/RELI-back-end/blob/main/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/andrei-popa-563916192
[product-screenshot]: https://github.com/Andrei123f/RELI-back-end/blob/main/public/cosmin_try.png
