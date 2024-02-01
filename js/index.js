"use strict";

document.addEventListener("DOMContentLoaded", function () {
  console.log("CONTENT LOADED");
  const greeting = document.createElement("h1");
  const root = document.querySelector("#root");

  greeting.textContent = "Discogs API Lookup";
  root.append(greeting);

  // We're defining a default, but this will change!
  let artistId = "219213";

  function get(url) {
    return fetch(url, {
      method: "GET",
      headers: {
        "User-Agent": "SeanIsRad/3.0",
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        return data;
      });
  }

  function showArtist(artistNam) {
    const artistHeader = document.createElement("h2");
    artistHeader.textContent = artistNam;
    root.appendChild(artistHeader);
  }

  function getReleases(url) {
    get(url + "?token=xdPpthHSMJYFKilnwZRtgwTRmciDXFvIqatyltto").then(function (
      data
    ) {
      // Destructure the releases
      const { releases } = data;
      // Create  UL
      const list = document.createElement("ul");
      // Append it to the #root
      root.appendChild(list);

      // Loop through the releases array
      releases.map(function (release) {
        // Create a list item
        const listItem = document.createElement("li");
        //create button
        const addToPlayListBTN = document.createElement("button");
        addToPlayListBTN.type = "button";
        addToPlayListBTN.textContent = "Add To Playlist";
        // Add the release title to the list item
        listItem.textContent = `${release.title} -  ${release.year}`;
        // Append the lisi item to the list
        listItem.appendChild(addToPlayListBTN);

        list.appendChild(listItem);
      });
    });
  }

  // This is an Immediately Invoked Function Expression aka IIFE (iffy)
  (function () {
    get(
      `https://api.discogs.com/artists/${artistId}?tokn=xdPpthHSMJYFKilnwZRtgwTRmciDXFvIqatyltto`
    ).then(function (data) {
      // Destructure our data
      const { name, releases_url } = data;
      // Call it back
      showArtist(name);
      getReleases(releases_url);
    });
  })();
});
