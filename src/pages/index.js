import { initialCards } from "../scripts/initialCards";

import "../pages/index.css";

/* buttons */
const addButton = document.querySelector(".profile__add-button");
const editButton = document.querySelector(".profile__edit-button");
const closeAddCard = document.querySelector(".close_add-card");
const closeEditPortfolio = document.querySelector(".close_edit-portfolio");

/* open image view */
const popupImageView = document.querySelector(".popup_type_image-view");
const popupImage = document.querySelector(".popup__image");
const popupImagetitle = document.querySelector(".popup__image-title");

/* template */
const templateCard = document.querySelector(".template");
const cardsContainer = document.querySelector(".cards__list");

/* profile */
const popupProfile = document.querySelector(".popup_type_edit-profile");
const popupAddCard = document.querySelector(".popup_type_add-card");
const nameInput = document.querySelector(".popup__input_name");
const profileName = document.querySelector(".profile__name");
const jobInput = document.querySelector(".popup__input_job");
const profileJob = document.querySelector(".profile__name");

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
  document.addEventListener("keydown", handleHotKey);
  document.addEventListener("mousedown", handleOverlayClick);
}

function closePopup(popupName) {
  popupName.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleHotKey);
  document.removeEventListener("mousedown", handleOverlayClick);
}

function handleHotKey(e) {
  const popupOpen = document.querySelector(".popup_opened");
  if (openPopup && e.key === "Escape") {
    closePopup(popupOpen);
  }
}

function handleOverlayClick(e) {
  const activePopup = document.querySelector(".popup_opened");
  if (activePopup && e.target === activePopup) {
    closePopup(activePopup);
  }
}

function editProfile() {
  openPopup(popupProfile);

  // nameInput.value = profileName.textContent;
  // jobInput.value = profileJob.textContent;
}

addButton.addEventListener("click", () => {
  openPopup(popupAddCard);
});

editButton.addEventListener("click", editProfile);

closeAddCard.addEventListener("click", () => {
  closePopup(popupAddCard);
});

closeAddCard.addEventListener("click", () => {
  closePopup(popupAddCard);
});

closeEditPortfolio.addEventListener("click", () => {
  closePopup(popupProfile);
});
