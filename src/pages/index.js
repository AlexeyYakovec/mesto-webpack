import { initialCards } from "../scripts/initialCards";

import "../pages/index.css";

/* forms */
const formProfile = document.forms.formProfile;
const formAddCard = document.forms.formAddCard;

/* inputs */

/* template */
const cardsContainer = document.querySelector(".cards__list");

function addPhoto(name, link) {
  const photoTemplate = document.querySelector(".template").content;
  const photoElement = photoTemplate.cloneNode(true);

  const deleteButton = photoElement.querySelector(".cards__delete");
  const likeButton = photoElement.querySelector(".cards__item-like");
  const cardImage = photoElement.querySelector(".cards__item-image");
  const cardTitle = photoElement.querySelector(".cards__item-title");

  cardTitle.textContent = name;
  cardImage.alt = name;
  cardImage.src = link;

  cardsContainer.addEventListener("click", handleLike);
  cardsContainer.addEventListener("click", handleDelete);

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
