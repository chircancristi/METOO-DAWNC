export function skill( skillName ) {
  try {
    if ( typeof skillName === "string" ) {
      let skill = document.createElement('li');
  
      skill.classList = 'skill';
      skill.innerText = skillName;
  
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

export function minimalListing( listingDetails, accountPage ) {
  try {
    if ( listingDetails.constructor == Object ) {
      
    } else {
      throw new Error("Markup: minimalListing - param1 is not an object!");
    }
  }

  catch (e) {
    throw e;
  }

}