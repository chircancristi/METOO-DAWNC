export function skill(skillName, border = false) {
	try {
		if (typeof skillName === 'string') {
			let skill = document.createElement('li');
			skill.innerText = skillName;

			if (border) {
				skill.classList = 'skill';
			}

			return skill;
		} else {
			throw new Error('Markup->skill - param is not string');
		}
	} catch (e) {
		throw e;
	}
}

export function addSkill() {
	let addSkillBtn = document.createElement('button');

	addSkillBtn.id = 'js-add-skill';
	addSkillBtn.classList = 'add-skill';
	addSkillBtn.title = 'Add new skill';
	addSkillBtn.innerText = '👌';

	return addSkillBtn;
}

export function editSkills() {
	let editSkillsBtn = document.createElement('button');

	editSkillsBtn.id = 'js-edit-skills';
	editSkillsBtn.classList = 'edit';
	editSkillsBtn.title = 'Edit existing skills';
	editSkillsBtn.innerText = 'Edit skills';

	return editSkillsBtn;
}

export function browseListing(listingDetails) {
	try {
		if (listingDetails.constructor == Object) {
			// listing el
			let listing = document.createElement('article');
			listing.classList = 'listing';

			// listing content container
			let listingContent = document.createElement('div');
			listingContent.classList = 'listing__content';

			// listing title
			let title = document.createElement('h3');
			title.classList = 'title';
			title.innerText = listingDetails.title;

			// listing required skills
			let requiredSkills = document.createElement('ul');
			requiredSkills.id = 'js-skills';
			requiredSkills.classList = 'skills-req';

			// create <li> for each required skill
			listingDetails.skills.forEach(skill => {
				let skillEl = document.createElement('li');
				skillEl.innerText = skill;

				// append skill <li> to the required skills <ul>
				requiredSkills.appendChild(skillEl);
			});

			// actions container
			let actions = document.createElement('div');
			actions.classList = 'actions';

			// join listing button
			let joinBtn = document.createElement('button');
			joinBtn.id = 'js-join';
			joinBtn.classList = 'join';
			joinBtn.value = listingDetails.id;
			joinBtn.innerText = 'Join';

			// view listing link
			let viewListingLink = document.createElement('a');
			viewListingLink.id = listingDetails.id;
			viewListingLink.classList = 'view-listing';
			viewListingLink.innerText = 'View listing';

			// append join button & view listing
			// link to the actions container
			actions.appendChild(joinBtn);
			actions.appendChild(viewListingLink);

			// append required title, skills & actions
			// to the listing content container
			listingContent.appendChild(title);
			listingContent.appendChild(requiredSkills);
			listingContent.appendChild(actions);

			// listing meta container
			let listingMeta = document.createElement('div');
			listingMeta.classList = 'listing__meta';

			// author
			let authorLink = document.createElement('a');
			let author = document.createElement('span');
			author.classList = 'author';
			author.innerText = listingDetails.author;

			authorLink.appendChild(author);

			// place
			let placeLink = document.createElement('a');
			let place = document.createElement('span');
			place.classList = 'place';
			place.innerText = listingDetails.place;

			placeLink.appendChild(place);

			// append author & place to listing
			// meta container
			listingMeta.appendChild(authorLink);
			listingMeta.appendChild(placeLink);

			// listing type
			let listingType = document.createElement('span');
			listingType.classList = 'listing__type';
			listingType.innerText = listingDetails.type;

			// append content, meta & type
			// to listing container
			listing.appendChild(listingContent);
			listing.appendChild(listingMeta);
			listing.appendChild(listingType);

			// flex item container
			let flexItem = document.createElement('div');
			flexItem.classList = 'flex__item';

			flexItem.appendChild(listing);

			return flexItem;
		} else {
			throw new Error('Markup->listing: param1 is not an object!');
		}
	} catch (e) {
		throw e;
	}
}

export function comment(commentDetails) {
	try {
		if (commentDetails.constructor == Object) {
			// comment container
			let comment = document.createElement('article');
			comment.classList = 'comment';

			// comment author container
			let commentAuthor = document.createElement('section');
			commentAuthor.classList = 'comment__author';

			// comment meta container
			let commentMeta = document.createElement('section');
			commentMeta.classList = 'comment__meta';

			// comment author name
			let authorName = document.createElement('p');
			authorName.classList = 'u-name';
			authorName.innerText = commentDetails.author;

			// comment author role
			let authorRole = document.createElement('span');
			authorRole.classList = `u-role u-role--${commentDetails.role}`;
			authorRole.innerText = commentDetails.role;

			// comment date
			let commentDate = document.createElement('span');
			commentDate.classList = 'time';

			// get date
			let dateString = new Date(commentDetails.date).toString();
			console.log(dateString);
			dateString = dateString
				.split(' ')
				.slice(0, 5)
				.join(' ');
			commentDate.innerText = dateString;

			// append name, role & date
			// to the comment meta container
			commentMeta.appendChild(authorName);
			commentMeta.appendChild(authorRole);
			commentMeta.appendChild(commentDate);

			// profile picture container
			let profilePic = document.createElement('div');
			profilePic.classList = `profile-pic ${commentDetails.role}`;

			let img = document.createElement('img');
			img.src = commentDetails.imgUrl;
			img.alt = 'User profile picture';

			// append img to profile picture container
			profilePic.appendChild(img);

			// append meta & profile-pic to
			// comment author container
			commentAuthor.appendChild(commentMeta);
			commentAuthor.appendChild(profilePic);

			// comment content container
			let commentContent = document.createElement('section');
			commentContent.classList = 'commnet__content';

			// comment content
			let content = document.createElement('p');
			content.innerText = commentDetails.content;

			// append comment content to its
			// container
			commentContent.appendChild(content);

			// append author & content to the
			// comment
			comment.appendChild(commentAuthor);
			comment.appendChild(commentContent);

			return comment;
		} else {
			throw new Error('Markup->comment: param is not of type object!');
		}
	} catch (e) {
		throw e;
	}
}
export function notification(notificationDetails) {
	let notification = document.createElement('li');
	notification.classList = 'notification';
	notification.id = notificationDetails.listing;
	let notificationIcon = document.createElement('div');
	notificationIcon.classList = 'notification__icon';

	let notificationIconObject = document.createElement('i');

	if (notificationDetails.type === 'add-listing') {
		notificationIconObject.classList = 'fas fa-plus-square';
	}
	if (notificationDetails.type === 'comment') {
		notificationIconObject.classList = 'fas fa-comment';
	}
	if (notificationDetails.type === 'request') {
		notificationIconObject.classList = 'fas fa-user-check';
  }
  if (notificationDetails.type === 'accepted') {
		notificationIconObject.classList = 'fas fa-smile-beam';
	}

	notificationIcon.appendChild(notificationIconObject);
	notification.appendChild(notificationIcon);
	let notificationDescription = document.createElement('div');
	notificationDescription.classList = 'notification__description';

	let notificationAuthor = document.createElement('span');
	notificationAuthor.classList = 'user';
	notificationAuthor.innerText = notificationDetails.src;

	notificationDescription.appendChild(notificationAuthor);
	if (notificationDetails.type === 'add-listing') {
		let notificationPlace = document.createElement('span');
		notificationPlace.classList = 'place';
		notificationPlace.innerText = notificationDetails.place;

		notificationDescription.innerHTML = notificationDescription.innerHTML + ` created a listing @`;
		notificationDescription.appendChild(notificationPlace);
	}
	if (notificationDetails.type === 'comment') {
		notificationDescription.innerHTML = notificationDescription.innerHTML + ` posted a comment`;
	}
	if (notificationDetails.type === 'request') {
		notificationDescription.innerHTML = notificationDescription.innerHTML + ` requested to join your listing`;
  }
  if (notificationDetails.type === 'accepted'){
    notificationDescription.innerHTML = notificationDescription.innerHTML + ` accepted your request`;
  }
	notification.appendChild(notificationDescription);

	return notification;
}
export function accountListing(listing, author) {
	let listingElement = document.createElement('a');
	listingElement.href = '#';
	if (author == true) listingElement.classList = 'listing listing--author';
	else listingElement.classList = 'listing listing--contributor';
  listingElement.id=listing.id;

  let listingTitleContainer= document.createElement("section");
  listingTitleContainer.classList="listing__title";
  
  let listingTitle = document.createElement("h2");
  listingTitle.classList="title";
  listingTitle.id="js-acc-listing-title";
  listingTitle.innerText=listing.title;

  listingTitleContainer.appendChild(listingTitle);

  listingElement.appendChild(listingTitleContainer);

  let listingInfoContainer=document.createElement("section");
  listingInfoContainer.classList="listing__info";

  let listingInfoRole=document.createElement("span");
  listingInfoRole.id="js-acc-listing-role";
  listingInfoRole.classList="role";
  if(author==false)
    listingInfoRole.innerText="Contributor";
  else
    listingInfoRole.innerText="Author";
  listingInfoContainer.appendChild(listingInfoRole);
  
  let listingInfoPlace=document.createElement("span");
  listingInfoPlace.id="js-acc-listing-place";
  listingInfoPlace.classList="place";
  listingInfoPlace.innerText=listing.place;

  listingInfoContainer.appendChild(listingInfoPlace);
  listingElement.appendChild(listingInfoContainer);

  let listingType=document.createElement("span");
  listingType.id="js-acc-listing-type";
  listingType.classList="type";
  listingType.innerText=listing.type;

  listingElement.appendChild(listingType);

  return listingElement;
} 
export function requests(request,listings){
  let requestElement=document.createElement("article");
  requestElement.classList="request";
  requestElement.id=`body${request.id}`;
  
  let userImg = document.createElement("img");
  userImg.src=request.imgUrl;
  userImg.alt="User profile photo";
  userImg.classList="profile-pic";
  requestElement.appendChild(userImg);

  let requestContentContainer= document.createElement("section");
  requestContentContainer.classList="request__content";
  
  let requestAuthor=document.createElement("span");
  requestAuthor.classList="name";
  requestAuthor.innerText=request.author;

  requestContentContainer.appendChild(requestAuthor);
  requestContentContainer.innerHTML=requestContentContainer.innerHTML+" as requested to join your ";
  let listingName;
  for (let i=0;i<listings.length;i++){
  
    if (listings[i].id==request.listing){
      listingName=listings[i].title;
      break;
    }
  }
  let requestListingName=document.createElement("span");
  requestListingName.classList="listing-title";
  requestListingName.innerText=listingName;

  requestContentContainer.appendChild(requestListingName);
  requestContentContainer.innerHTML=requestContentContainer.innerHTML+" listing";

  let requestActionsContainer=document.createElement("section");
  requestActionsContainer.classList="request__actions";

  let acceptButton=document.createElement("button");
  let declineButton=document.createElement("button");

  acceptButton.classList="accept";
  acceptButton.innerText="accept";
  acceptButton.id=request.id;

  declineButton.classList="deny";
  declineButton.innerText="deny";
  declineButton.id=request.id;

  requestActionsContainer.appendChild(acceptButton);
  requestActionsContainer.appendChild(declineButton);

  requestContentContainer.appendChild(requestActionsContainer);

  requestElement.appendChild(requestContentContainer);

  return requestElement;
  

}
