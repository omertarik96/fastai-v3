var el = x => document.getElementById(x);

function toggleMobileMenu(){
  menu = el("menu");
  if (menu.classList.contains("hidden")) {
    // it is hidden, show the menu
    menu.classList.remove("hidden");
  } else {
    // menu is not hidden, hide the menu
    menu.classList.add("hidden");
  }
}

function toggleButton(buttonId) {
  console.log(buttonId);
  var button = el(buttonId);
  console.log(button);
  //console.log(button.style);
}

function showPicker() {
  el("file-input").click();
}


function showPicked(input) {
  el("upload-label").innerHTML = input.files[0].name;
  var reader = new FileReader();
  reader.onload = function (e) {
    el("image-picked").src = e.target.result;
    el("image-picked").className = "";
    el("image-picked").setAttribute("sampleid", "");
  };
  reader.readAsDataURL(input.files[0]);

}

function analyze() {
  var uploadFiles = el("file-input").files;
  console.log(UploadFiles);
  if (uploadFiles.length !== 1) alert("Please select a file to analyze!");

  el("analyze-button").innerHTML = "Analyzing...";
  var xhr = new XMLHttpRequest();
  var loc = window.location;
  xhr.open("POST", `${loc.protocol}//${loc.hostname}:${loc.port}/analyze`,
    true);
  xhr.onerror = function () {
    alert(xhr.responseText);
  };
  xhr.onload = function (e) {
    if (this.readyState === 4) {
      var response = JSON.parse(e.target.responseText);
      el("result-label").innerHTML = `Result = ${response["result"]}`;
    }
    el("analyze-button").innerHTML = "Analyze";
  };



  var fileData = new FormData();
  fileData.append("file", uploadFiles[0]);
  xhr.send(fileData);
}



function loadPreImage(imageSrc, imageId) {
  let preview_image_el = document.getElementById('image-picked');
  preview_image_el.setAttribute("src", imageSrc);
  //preview_image_el.classList.remove('no-display');
  preview_image_el.setAttribute("sampleid", imageId)
}

function nameBeautifier(shoeName) {
  switch (shoeName) {
    case 'boots_ankle':
      return "Ankle (Boots)";
    case 'boots_knee_half':
      return "Knee Half (Boots)"
    case 'boots_mid_calf':
      return "Mid Calf (Boots)";
    case 'boots_over_the_knee':
      return "Over The Knee (Boots)";
    case 'boots_prewalker':
      return "Prewalker (Boots)";
    case 'sandals_athletic':
      return "Athletic (Sandals)";
    case 'sandals_heel':
      return "Heel (Sandals)";
    case 'shoes_boat':
      return "Boat (Shoes)";
    case 'shoes_clogs_and_mules':
      return "Clogs and Mules (Shoes)";
    case 'shoes_crib':
      return "Crib (Shoes)";
    case 'shoes_firstwalker':
      return "First Walker (Shoes)";
    case 'shoes_flats':
      return "Flat (Shoes)";
    case 'shoes_heels':
      return "Heels (Shoes)";
    case 'shoes_loafers':
      return "Loafers (Shoes)";
    case 'shoes_oxfords':
      return "Oxfords (Shoes)";
    case 'shoes_prewalker':
      return "Prewalker (Shoes)";
    case 'shoes_sneakers_and_athletic':
      return "Athletic Sneaker (Shoes)";
    case 'slipper_flats':
      return "Flats (Slippers)";
    case 'slipper_heels':
      return "Heels (Slippers)";
    case 'slippers_boot':
      return "Boots (Slippers)";
    case 'sandals_flat':
      return "Flat (Sandals)";
  }
}


function analyze2() {
  var uploadFiles = el("file-input").files;
  let previewImageId = el('image-picked').getAttribute("sampleid");

  console.log(previewImageId);

  var xhr = new XMLHttpRequest();
  var loc = window.location;



  if (previewImageId !== "") {
    if (uploadFiles.length !== 1 && previewImageId === "") {
      alert("Please upload or select a sample file below");
    } else {
      el("analyze-button").innerHTML = "Analyzing...";

      xhr.open("POST", `${loc.protocol}//${loc.hostname}:${loc.port}/analyzesample`,
        true);

      xhr.onerror = function () {
        alert(xhr.responseText);
      };
      xhr.onload = function (e) {
        if (this.readyState === 4) {
          var response = JSON.parse(e.target.responseText);
          let shoeName = nameBeautifier(response["result"])
          el("result-label").innerHTML = `${shoeName}`;
          el("result-label").classList.remove('no-display');
        }
        el("analyze-button").innerHTML = "Analyze";
      };

      var fileData = new FormData();
      fileData.append("sample_id", previewImageId);
      xhr.send(fileData);
    }
  } else {
    // From file upload

    el("analyze-button").innerHTML = "Analyzing...";
    var xhr = new XMLHttpRequest();
    var loc = window.location;
    xhr.open("POST", `${loc.protocol}//${loc.hostname}:${loc.port}/analyze`,
      true);

    xhr.onerror = function () {
      alert(xhr.responseText);
    };
    xhr.onload = function (e) {
      if (this.readyState === 4) {
        var response = JSON.parse(e.target.responseText);
        let shoeName = nameBeautifier(response["result"])
        el("result-label").innerHTML = `${shoeName}`;
        el("result-label").classList.remove('no-display');
      }
      el("analyze-button").innerHTML = "Analyze";
    };

    var fileData = new FormData();
    fileData.append("file", uploadFiles[0]);
    xhr.send(fileData);
  }
}