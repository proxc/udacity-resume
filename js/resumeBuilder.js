var resume = function() {
  var bio = {
    'name': 'Chad McRann',
    'role': 'Developer',
    'contacts': {
      'mobile': '555-555-5555',
      'email': 'mcrannch@gmail.com',
      'github': 'proxc',
      'twiter': '',
      'location': 'Reno'
    },
    'welcomeMessage': 'Welcome to this place',
    'skills': [
      'breaking things', 'building things', 'keep on keeping on'
    ],
    'bioPic': 'images/fry.jpg'
  };

  var work = {
    'jobs': [{
        'employer': 'Swift Communications',
        'title': 'Developer',
        'location': 'Reno',
        'dates': '2012 - 2014',
        'description': 'Build newspaper websites'
      },
      {
        'employer': 'Noble Studios',
        'title': 'Frontend Developer',
        'location': 'Reno',
        'dates': '2014 - prensent',
        'description': 'Build lots of websites'
      },
    ]
  };

  var projects = {
    'projects': [{
        'title': 'Yosemite.com',
        'dates': '2016',
        'description': 'yosemite national park',
        'images': ['http://www.yosemite.com/wp-content/uploads/2016/04/Yosemite-Falls-Slide-700x425.jpg']
      },
      {
        'title': 'TMWA.com',
        'dates': '2016',
        'description': 'Truckee Meadows Water Authority',
        'images': ['http://tmwa.com/wp-content/uploads/2016/11/news.jpg']
      },
      {
        'title': 'Fargo',
        'dates': '2017',
        'description': 'Fargo North Dakota',
        'images': []
      }
    ]
  };

  var education = {
    'schools': [{
      'name': 'University of Wyoming',
      'location': 'Laramie, Wy',
      'date': '2011',
      'degree': 'BS',
      'url': 'http://www.uwyo.edu/',
      'majors': ['cs']
    }],
    'onlineCourses': [{
      'title': 'Front-End Web Developer Nanodegree',
      'school': 'Udacity',
      'dates': '2016 - 2017',
      'url': 'https://www.udacity.com/course/front-end-web-developer-nanodegree--nd001'
    }]
  };

  var tools = {};

  tools.prepend = function(selector, newString) {
    $(selector).prepend(newString);
  };

  tools.append = function(selector, newString) {
    $(selector).append(newString);
  };

  tools.replace = function(srcString, newString) {
    return srcString.replace('%data%', newString);
  };

  tools.replaceContact = function(srcString, newString, label) {
    var formatted = srcString.replace('%data%', newString);
    formatted = formatted.replace('%contact%', label);
    return formatted;
  };

  var build = function() {
    bio.buildBio();
    work.buildJobs();
    projects.buildProjects();
    education.buildEducation();
  };

  bio.buildBio = function() {
    bio.buildHeader();
    bio.buildContact();
    bio.buildImage();
    bio.buildSkills();
    bio.buildBottomContact();
  };

  bio.buildHeader = function() {
    var formattedRole = tools.replace(HTMLheaderRole, bio.role);
    var formattedName = tools.replace(HTMLheaderName, bio.name);
    tools.prepend('#header', formattedRole);
    tools.prepend('#header', formattedName);
  };

  bio.buildContact = function() {
    var items = Object.keys(bio.contacts);
    for (var i = 0; i < items.length; i++) {
      tools.append('#topContacts', tools.replaceContact(HTMLcontactGeneric, bio.contacts[items[i]], items[i]));
    }
  };

  bio.buildBottomContact = function() {
    var items = Object.keys(bio.contacts);
    for (var i = 0; i < items.length; i++) {
      tools.append('#footerContacts', tools.replaceContact(HTMLcontactGeneric, bio.contacts[items[i]], items[i]));
    }
  };

  bio.buildImage = function() {
    tools.append('#header', tools.replace(HTMLbioPic, bio.bioPic));
    tools.append('#header', tools.replace(HTMLwelcomeMsg, bio.welcomeMessage));
  };

  bio.buildSkills = function() {
    tools.append('#header', HTMLskillsStart);
    for (var i = 0; i < bio.skills.length; i++) {
      tools.append('#skills', tools.replace(HTMLskills, bio.skills[i]));
    }
  };

  work.buildJobs = function() {
    for (var i = 0; i < work.jobs.length; i++) {
      tools.append('#workExperience', HTMLworkStart);
      var formattedEmployer = tools.replace(HTMLworkEmployer, work.jobs[i].employer);
      var formattedTitle = tools.replace(HTMLworkTitle, work.jobs[i].title);
      var formattedEmployerTitle = formattedEmployer + formattedTitle;

      var formattedDates = tools.replace(HTMLworkDates, work.jobs[i].dates);
      var formattedDescription = tools.replace(HTMLworkDescription, work.jobs[i].description);

      tools.append('.work-entry:last', formattedEmployerTitle);
      tools.append('.work-entry:last', formattedDates);
      tools.append('.work-entry:last', formattedDescription);
    }
  };

  projects.buildProjects = function() {
    for (var i = 0; i < projects.projects.length; i++) {
      tools.append('#projects', HTMLprojectStart);
      tools.append('.project-entry:last', tools.replace(HTMLprojectTitle, projects.projects[i].title));
      tools.append('.project-entry:last', tools.replace(HTMLprojectDates, projects.projects[i].dates));
      tools.append('.project-entry:last', tools.replace(HTMLprojectDescription, projects.projects[i].description));
      for (var x = 0; x < projects.projects[i].images.length; x++) {
        tools.append('.project-entry:last', tools.replace(HTMLprojectImage, projects.projects[i].images[x]));
      }
    }
  };

  education.buildEducation = function() {
    for (var i = 0; i < education.schools.length; i++) {
      var name = tools.replace(HTMLschoolName, education.schools[i].name);
      var degree = tools.replace(HTMLschoolDegree, education.schools[i].degree);
      var title = name + degree;
      tools.append('#education', HTMLschoolStart);
      tools.append('.education-entry:last', title);
      tools.append('.education-entry:last', tools.replace(HTMLschoolDates, education.schools[i].date));
      tools.append('.education-entry:last', tools.replace(HTMLschoolMajor, education.schools[i].majors));
      tools.append('.education-entry:last', tools.replace(HTMLschoolLocation, education.schools[i].location));
    }

    tools.append('#education', HTMLonlineClasses);
    for (var x = 0; x < education.onlineCourses.length; x++) {
      var onlineName = tools.replace(HTMLonlineTitle, education.onlineCourses[x].title);
      var school = tools.replace(HTMLonlineSchool, education.onlineCourses[x].school);
      var onlineTitle = onlineName + school;
      tools.append('#education', HTMLschoolStart);
      tools.append('.education-entry:last', onlineTitle);
      tools.append('.education-entry:last', tools.replace(HTMLonlineDates, education.onlineCourses[x].dates));
      tools.append('.education-entry:last', tools.replace(HTMLonlineURL, education.onlineCourses[x].url));
    }
  };


  build();

}();
