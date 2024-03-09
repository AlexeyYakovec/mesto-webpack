import { initialCards } from "../scripts/initialCards";

import "../pages/index.css";

/* open image view */
const popupImageView = document.querySelector(".popup_type_image-view");
const popupImage = document.querySelector(".popup__image");
const popupImagetitle = document.querySelector(".popup__image-title");

/* popups */
const popupUpdateAvatar = document.querySelector(".popup_type_update-avatar");
const popupEditProfile = document.querySelector(".popup_type_edit-profile");
const popupDeleteCard = document.querySelector(".popup_type_delete-card");
const popupAddCard = document.querySelector(".popup_type_add-card");

/* buttons */
const buttonEdit = document.querySelector(".profile__edit-button");
const buttonAdd = document.querySelector(".profile__add-button");
const buttonUpdateAvatar = document.querySelector(
  ".profile__avatar-edit-button"
);

/* forms */
const popupFormProfile = popupEditProfile.querySelector(".popup__form");
const popupFormAvatar = popupUpdateAvatar.querySelector(".popup__form");
const popupFormAddCard = popupAddCard.querySelector(".popup__form");

/* fields */
const popupUserAvatar = document.querySelector(".profile__avatar");
const popupUserName = document.querySelector(".profile__name");
const popupUserAbout = document.querySelector(".profile__job");

/* template */
const templateCard = document.querySelector(".template");
const cardsContainer = document.querySelector(".cards__list");

function createCard(name, link) {
  const newCard = templateCard.content
    .querySelector(".cards__item")
    .cloneNode(true);

  const cardDeleteButton = newCard.querySelector(".cards__delete");
  const cardLikeButton = newCard.querySelector(".cards__item-like");
  const cardTitle = newCard.querySelector(".cards__item-title");
  const cardImage = newCard.querySelector(".cards__item-image");

  cardTitle.textContent = name;
  cardImage.alt = name;
  cardImage.src = link;

  cardDeleteButton.addEventListener("click", handleDelete);
  cardLikeButton.addEventListener("click", handleLike);
  cardImage.addEventListener("click", () => {
    handleModal(name, link);
  });

  return newCard;
}

initialCards.forEach((card) => {
  let newCard = createCard(card.name, card.link);
  cardsContainer.append(newCard);
});

function handleModal(name, link) {
  openPopup(popupImageView);
  popupImagetitle.textContent = name;
  popupImage.alt = name;
  popupImage.src = link;
}

function handleDelete(e) {
  e.target.closest(".cards__item").remove();
}

function handleLike(e) {
  e.target.classList.add("cards__item-like_active");
}

function openPopup(popupName) {
  popupName.classList.add("popup_opened");
}

function closePopup(popupName) {
  popupName.classList.remove("popup_opened");
}
