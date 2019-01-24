export function skill( skillName, border = false ) {
  try {
    if ( typeof skillName === "string" ) {
      let skill = document.createElement('li');
      skill.innerText = skillName;
      
      if ( border ) {
        skill.classList = 'skill';
      }

      return skill;
    } else {
      throw new Error("Markup->skill - param is not string");
    }
  } catch (e) {
    throw e;
  }
}

export function addSkill() {
  let addSkillBtn = document.createElement("button");

  addSkillBtn.id = "js-add-skill";
  addSkillBtn.classList = "add-skill";
  addSkillBtn.title = "Add new skill";
  addSkillBtn.innerText = '👌';

  return addSkillBtn;
}

export function editSkills() {
  let editSkillsBtn = document.createElement("button");

  editSkillsBtn.id = "js-edit-skills";
  editSkillsBtn.classList = "edit";
  editSkillsBtn.title = "Edit existing skills";
  editSkillsBtn.innerText = "Edit skills";

  return editSkillsBtn;
}

export function browseListing( listingDetails ) {

  try {
    if ( listingDetails.constructor == Object ) {
      // listing el
      let listing = document.createElement("article");
      listing.classList = "listing";

      // listing content container
      let listingContent = document.createElement("div");
      listingContent.classList = "listing__content";

      // listing title
      let title = document.createElement("h3");
      title.classList = "title";
      title.innerText = listingDetails.title;

      // listing required skills
      let requiredSkills = document.createElement("ul");
      requiredSkills.id = "js-skills";
      requiredSkills.classList = "skills-req";

      // create <li> for each required skill
      listingDetails.skills.forEach( skill => {
        let skillEl = document.createElement('li');
        skillEl.innerText = skill;

        // append skill <li> to the required skills <ul>
        requiredSkills.appendChild( skillEl );
      });

      // actions container
      let actions = document.createElement("div");
      actions.classList = "actions";

      // join listing button
      let joinBtn = document.createElement("button");
      joinBtn.id = "js-join";
      joinBtn.classList = "join";
      joinBtn.value = listingDetails.id;
      joinBtn.innerText = "Join";

      // view listing link
      let viewListingLink = document.createElement("a");
      viewListingLink.id = listingDetails.id;
      viewListingLink.classList = "view-listing";
      viewListingLink.innerText = "View listing";

      // append join button & view listing
      // link to the actions container
      actions.appendChild( joinBtn );
      actions.appendChild( viewListingLink );

      // append required title, skills & actions
      // to the listing content container
      listingContent.appendChild( title );
      listingContent.appendChild( requiredSkills );
      listingContent.appendChild( actions );

      // listing meta container
      let listingMeta = document.createElement("div");
      listingMeta.classList = "listing__meta";

      // author
      let authorLink = document.createElement("a");
      let author = document.createElement("span");
      author.classList = "author";
      author.innerText = listingDetails.author;

      authorLink.appendChild( author );

      // place
      let placeLink = document.createElement("a");
      let place = document.createElement("span");
      place.classList = "place";
      place.innerText = listingDetails.place;

      placeLink.appendChild( place );

      // append author & place to listing
      // meta container
      listingMeta.appendChild( authorLink );
      listingMeta.appendChild( placeLink );

      // listing type
      let listingType = document.createElement("span");
      listingType.classList = "listing__type";
      listingType.innerText = listingDetails.type;

      // append content, meta & type
      // to listing container
      listing.appendChild( listingContent );
      listing.appendChild( listingMeta );
      listing.appendChild( listingType );

      // flex item container
      let flexItem = document.createElement("div");
      flexItem.classList = "flex__item";

      flexItem.appendChild( listing );

      return flexItem;
    } else {
      throw new Error("Markup->listing: param1 is not an object!")
    }
  }

  catch (e) {
    throw e;
  }
}

export function comment( commentDetails ) {
  try {
    if ( commentDetails.constructor == Object ) {
      // comment container
      let comment = document.createElement("article");
      comment.classList = "comment";

      // comment author container
      let commentAuthor = document.createElement("section");
      commentAuthor.classList = "comment__author";

      // comment meta container
      let commentMeta = document.createElement("section");
      commentMeta.classList = "comment__meta";

      // comment author name
      let authorName = document.createElement("p");
      authorName.classList = "u-name";
      authorName.innerText = commentDetails.author;

      // comment author role
      let authorRole = document.createElement("span");
      authorRole.classList = `u-role u-role--${commentDetails.role}`;
      authorRole.innerText = commentDetails.role;

      // comment date
      let commentDate = document.createElement("span");
      commentDate.classList = "time";

      // get date
      let dateString = new Date(commentDetails.date).toString();
      console.log(dateString)
      dateString = dateString.split(' ').slice(0, 5).join(' ');
      commentDate.innerText = dateString;

      // append name, role & date
      // to the comment meta container
      commentMeta.appendChild( authorName );
      commentMeta.appendChild( authorRole );
      commentMeta.appendChild( commentDate );

      // profile picture container
      let profilePic = document.createElement("div");
      profilePic.classList = `profile-pic ${commentDetails.role}`;

      let img = document.createElement("img");
      img.src = commentDetails.imgUrl;
      img.alt = "User profile picture";

      // append img to profile picture container
      profilePic.appendChild( img );

      // append meta & profile-pic to
      // comment author container
      commentAuthor.appendChild( commentMeta );
      commentAuthor.appendChild( profilePic );

      // comment content container
      let commentContent = document.createElement("section");
      commentContent.classList = "commnet__content";

      // comment content
      let content = document.createElement("p");
      content.innerText = commentDetails.content;

      // append comment content to its
      // container
      commentContent.appendChild( content );

      // append author & content to the
      // comment
      comment.appendChild( commentAuthor );
      comment.appendChild( commentContent );

      return comment;
    } else {
      throw new Error("Markup->comment: param is not of type object!");
    }
  }

  catch (e) {
    throw e;
  }
}
