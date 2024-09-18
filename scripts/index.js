const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];
// Buttons

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditClose = document.querySelector("#profile-edit-close");
const addNewCardButton = document.querySelector(".profile__add-button");
const newCardCloseButton = document.querySelector("#add-card-close");
const imageClose = document.querySelector("#popup-close");

// Elements

const profileEditModal = document.querySelector("#profile-edit-modal");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = profileEditModal.querySelector(".modal__form");
const profileAddCardForm = document.querySelector("#add-card-modal");
const addCardModal = document.querySelector("#add-card-modal");
const addCardTitle = addCardModal.querySelector(".modal__form");
const cardTitleInput = profileAddCardForm.querySelector(
  ".modal__input_type_title"
);
const cardUrlInput = profileAddCardForm.querySelector(".modal__input_type_url");
const imageModal = document.querySelector("#image-popup");
const modalImageElement = imageModal.querySelector(".modal__image");
const modalCaption = imageModal.querySelector(".modal__caption");

// Cards

const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

// Functions

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscape);
}

function closePopup(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscape);
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);

  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardTitleEl.textContent = cardData.name;
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;

  cardImageEl.addEventListener("click", () => {
    modalImageElement.src = cardImageEl.src;
    modalImageElement.alt = cardImageEl.alt;
    modalCaption.textContent = cardImageEl.alt;
    openModal(imageModal);
  });

  return cardElement;
}

function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  wrapper.prepend(cardElement);
}

function handleEscape(evt) {
  if (evt.key === "Escape") {
    const openModal = document.querySelector(".modal_opened");
    closePopup(openModal);
  }
}

function handleCloseOverlay(evt) {
  if (evt.target.classList.contains("modal_opened")) {
    closePopup(evt.target);
  }
}

// Event Listeners

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});

profileEditForm.addEventListener("submit", (e) => {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
});

profileAddCardForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardListEl);
  closePopup(addCardModal);
  cardTitleInput.value = "";
  cardUrlInput.value = "";
});

addNewCardButton.addEventListener("click", () => {
  openModal(addCardModal);
});

profileEditClose.addEventListener("click", () => {
  closePopup(profileEditModal);
});

newCardCloseButton.addEventListener("click", () => {
  closePopup(addCardModal);
});

imageClose.addEventListener("click", () => {
  closePopup(imageModal);
});

[profileEditModal, addCardModal, imageModal].forEach((modal) => {
  modal.addEventListener("click", handleCloseOverlay);
});

// loops

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));
