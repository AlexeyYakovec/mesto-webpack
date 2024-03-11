import { initialCards } from "../scripts/initialCards";

import "../pages/index.css";

/* open image view */
const popupImageView = document.querySelector(".popup_type_image-view");
const popupImage = document.querySelector(".popup__image");
const popupImagetitle = document.querySelector(".popup__image-title");

/* forms */
const formProfile = document.forms.formProfile;
const formAddCard = document.forms.formAddCard;

/* template */
const cardsContainer = document.querySelector(".cards__list");

function addPhoto(name, link) {
  const photoTemplate = document.querySelector(".template").content;
  const photoElement = photoTemplate.cloneNode(true);

  const cardImage = photoElement.querySelector(".cards__item-image");
  const cardTitle = photoElement.querySelector(".cards__item-title");

  cardTitle.textContent = name;
  cardImage.alt = name;
  cardImage.src = link;

  cardsContainer.addEventListener("click", handleLike);
  cardsContainer.addEventListener("click", handleDelete);
  cardImage.addEventListener("click", () => {
    handleModal(name, link);
  });

  return photoElement;
}

initialCards.forEach((card) => {
  let newCard = addPhoto(card.name, card.link);
  cardsContainer.append(newCard);
});

function handleLike(evt) {
  const likePhoto = evt.target.closest(".cards__item-like");
  if (likePhoto) {
    likePhoto.classList.toggle("cards__item-like_active");
  }
}

function handleDelete(evt) {
  const deleteCard = evt.target.closest(".cards__delete");
  if (deleteCard) {
    let item = evt.target.closest(".cards__item");
    item.remove();
  } else {
    return;
  }
}

function handleModal(name, link) {
  openPopup(popupImageView);
  popupImagetitle.textContent = name;
  popupImage.alt = name;
  popupImage.src = link;
}

function openPopup(popupName) {
  popupName.classList.add("popup_opened");

  document.addEventListener("keydown", handleHotKey);
  document.addEventListener("mousedown", handleOverlayClick);
}

function closePopup(popupName) {
  popupName.classList.remove("popup_opened");

  document.addEventListener("keydown", handleHotKey);
  document.addEventListener("mousedown", handleOverlayClick);
}

function handleHotKey(e) {
  const popupOpen = document.querySelector(".popup_opened");
  if (popupOpen && e.key === "Escape") {
    closePopup(popupOpen);
  }
}

function handleOverlayClick(e) {
  const popupOpen = document.querySelector(".popup_opened");
  if (popupOpen && e.target === popupOpen) {
    closePopup(popupOpen);
  }
}
