const oscars = [
  {
    name: "Best Picture",

    choices: [
      "Call Me by Your Name",
      "Darkest Hour",
      "Dunkirk",
      "Get Out",
      "Lady Bird",
      "Phantom Thread",
      "The Post",
      "The Shape of Water",
      "Three Billboards Outside Ebbing, Missouri"
    ],

    points: 10
  },

  {
    name: "Lead Actor",

    choices: [
      "Timothée Chalamet, “Call Me by Your Name”",
      "Daniel Day-Lewis, “Phantom Thread”",
      "Daniel Kaluuya, “Get Out”",
      "Gary Oldman, “Darkest Hour”",
      "Denzel Washington, “Roman J. Israel, Esq.”"
    ],

    points: 5
  },

  {
    name: "Lead Actress",

    choices: [
      "Sally Hawkins, “The Shape of Water”",
      "Frances McDormand, “Three Billboards Outside Ebbing, Missouri”",
      "Margot Robbie, “I, Tonya”",
      "Saoirse Ronan, “Lady Bird”",
      "Meryl Streep, “The Post”"
    ],

    points: 5
  },

  {
    name: "Supporting Actor",

    choices: [
      "Willem Dafoe, “The Florida Project”",
      "Woody Harrelson, “Three Billboards Outside Ebbing, Missouri”",
      "Richard Jenkins, “The Shape of Water”",
      "Christopher Plummer, “All the Money in the World”",
      "Sam Rockwell, “Three Billboards Outside Ebbing, Missouri”"
    ],

    points: 3
  },

  {
    name: "Supporting Actress",

    choices: [
      "Mary J. Blige, “Mudbound”",
      "Allison Janney, “I, Tonya”",
      "Lesley Manville, “Phantom Thread”",
      "Laurie Metcalf, “Lady Bird”",
      "Octavia Spencer, “The Shape of Water”"
    ],

    points: 3
  },

  {
    name: "Director",

    choices: [
      "“Dunkirk,” Christopher Nolan",
      "“Get Out,” Jordan Peele",
      "“Lady Bird,” Greta Gerwig",
      "“Phantom Thread,” Paul Thomas Anderson",
      "“The Shape of Water,” Guillermo del Toro"
    ],

    points: 5
  },

  {
    name: "Animated Feature",

    choices: [
      "“The Boss Baby,” Tom McGrath, Ramsey Ann Naito",
      "“The Breadwinner,” Nora Twomey, Anthony Leo",
      "“Coco,” Lee Unkrich, Darla K. Anderson",
      "“Ferdinand,” Carlos Saldanha",
      "“Loving Vincent,” Dorota Kobiela, Hugh Welchman, Sean Bobbitt, Ivan Mactaggart, Hugh Welchman"
    ],

    points: 5
  },

  {
    name: "Animated Short",

    choices: [
      "“Dear Basketball,” Glen Keane, Kobe Bryant",
      "“Garden Party,” Victor Caire, Gabriel Grapperon",
      "“Lou,” Dave Mullins, Dana Murray",
      "“Negative Space,” Max Porter, Ru Kuwahata",
      "“Revolting Rhymes,” Jakob Schuh, Jan Lachauer"
    ],

    points: 3
  },

  {
    name: "Adapted Screenplay",

    choices: [
      "“Call Me by Your Name,” James Ivory",
      "“The Disaster Artist,” Scott Neustadter & Michael H. Weber",
      "“Logan,” Scott Frank & James Mangold and Michael Green",
      "“Molly’s Game,” Aaron Sorkin",
      "“Mudbound,” Virgil Williams and Dee Rees"
    ],

    points: 3
  },

  {
    name: "Original Screenplay",

    choices: [
      "“The Big Sick,” Emily V. Gordon & Kumail Nanjiani",
      "“Get Out,” Jordan Peele",
      "“Lady Bird,” Greta Gerwig",
      "“The Shape of Water,” Guillermo del Toro, Vanessa Taylor",
      "“Three Billboards Outside Ebbing, Missouri,” Martin McDonagh"
    ],

    points: 3
  },

  {
    name: "Cinematography",

    choices: [
      "“Blade Runner 2049,” Roger Deakins",
      "“Darkest Hour,” Bruno Delbonnel",
      "“Dunkirk,” Hoyte van Hoytema",
      "“Mudbound,” Rachel Morrison",
      "“The Shape of Water,” Dan Laustsen"
    ],

    points: 3
  },

  {
    name: "Best Documentary Feature",

    choices: [
      "“Abacus: Small Enough to Jail,” Steve James, Mark Mitten, Julie Goldman",
      "“Faces Places,” JR, Agnès Varda, Rosalie Varda",
      "“Icarus,” Bryan Fogel, Dan Cogan",
      "“Last Men in Aleppo,” Feras Fayyad, Kareem Abeed, Soren Steen Jepersen",
      "“Strong Island,” Yance Ford, Joslyn Barnes"
    ],

    points: 3
  },

  {
    name: "Best Documentary Short Subject",

    choices: [
      "“Edith+Eddie,” Laura Checkoway, Thomas Lee Wright",
      "“Heaven is a Traffic Jam on the 405,” Frank Stiefel",
      "“Heroin(e),” Elaine McMillion Sheldon, Kerrin Sheldon",
      "“Knife Skills,” Thomas Lennon",
      "“Traffic Stop,” Kate Davis, David Heilbroner"
    ],

    points: 3
  },

  {
    name: "Best Live Action Short Film",

    choices: [
      "“DeKalb Elementary,” Reed Van Dyk",
      "“The Eleven O’Clock,” Derin Seale, Josh Lawson",
      "“My Nephew Emmett,” Kevin Wilson, Jr.",
      "“The Silent Child,” Chris Overton, Rachel Shenton",
      "“Watu Wote/All of Us,” Katja Benrath, Tobias Rosen"
    ],

    points: 2
  },

  {
    name: "Best Foreign Language Film",

    choices: [
      "“A Fantastic Woman” (Chile)",
      "“The Insult” (Lebanon)",
      "“Loveless” (Russia)",
      "“On Body and Soul (Hungary)",
      "“The Square” (Sweden)"
    ],

    points: 3
  },

  {
    name: "Film Editing",

    choices: [
      "“Baby Driver,” Jonathan Amos, Paul Machliss",
      "“Dunkirk,” Lee Smith",
      "“I, Tonya,” Tatiana S. Riegel",
      "“The Shape of Water,” Sidney Wolinsky",
      "“Three Billboards Outside Ebbing, Missouri,” Jon Gregory"
    ],

    points: 3
  },

  {
    name: "Sound Editing",

    choices: [
      "“Baby Driver,” Julian Slater",
      "“Blade Runner 2049,” Mark Mangini, Theo Green",
      "“Dunkirk,” Alex Gibson, Richard King",
      "“The Shape of Water,” Nathan Robitaille, Nelson Ferreira",
      "“Star Wars: The Last Jedi,” Ren Klyce, Matthew Wood"
    ],

    points: 2
  },

  {
    name: "Sound Mixing",

    choices: [
      "“Baby Driver,” Mary H. Ellis, Julian Slater, Tim Cavagin",
      "“Blade Runner 2049,” Mac Ruth, Ron Bartlett, Doug Hephill",
      "“Dunkirk,” Mark Weingarten, Gregg Landaker, Gary A. Rizzo",
      "“The Shape of Water,” Glen Gauthier, Christian Cooke, Brad Zoern",
      "“Star Wars: The Last Jedi,” Stuart Wilson, Ren Klyce, David Parker, Michael Semanick"
    ],

    points: 2
  },

  {
    name: "Production Design",

    choices: [
      "“Beauty and the Beast,” Sarah Greenwood; Katie Spencer",
      "“Blade Runner 2049,” Dennis Gassner, Alessandra Querzola",
      "“Darkest Hour,” Sarah Greenwood, Katie Spencer",
      "“Dunkirk,” Nathan Crowley, Gary Fettis",
      "“The Shape of Water,” Paul D. Austerberry, Jeffrey A. Melvin, Shane Vieau"
    ],

    points: 2
  },

  {
    name: "Original Score",

    choices: [
      "“Dunkirk,” Hans Zimmer",
      "“Phantom Thread,” Jonny Greenwood",
      "“The Shape of Water,” Alexandre Desplat",
      "“Star Wars: The Last Jedi,” John Williams",
      "“Three Billboards Outside Ebbing, Missouri,” Carter Burwell"
    ],

    points: 3
  },

  {
    name: "Original Song",

    choices: [
      "“Mighty River” from “Mudbound,” Mary J. Blige",
      "“Mystery of Love” from “Call Me by Your Name,” Sufjan Stevens",
      "“Remember Me” from “Coco,” Kristen Anderson-Lopez, Robert Lopez",
      "“Stand Up for Something” from “Marshall,” Diane Warren, Common",
      "“This Is Me” from “The Greatest Showman,” Benj Pasek, Justin Paul"
    ],

    points: 3
  },

  {
    name: "Makeup and Hair",

    choices: [
      "“Darkest Hour,” Kazuhiro Tsuji, David Malinowski, Lucy Sibbick",
      "“Victoria and Abdul,” Daniel Phillips and Lou Sheppard",
      "“Wonder,” Arjen Tuiten"
    ],

    points: 1
  },

  {
    name: "Costume Design",

    choices: [
      "“Beauty and the Beast,” Jacqueline Durran",
      "“Darkest Hour,” Jacqueline Durran",
      "“Phantom Thread,” Mark Bridges",
      "“The Shape of Water,” Luis Sequeira",
      "“Victoria and Abdul,” Consolata Boyle"
    ],

    points: 2
  },

  {
    name: "Visual Effects",

    choices: [
      "“Blade Runner 2049,” John Nelson, Paul Lambert, Richard R. Hoover, Gerd Nefzer",
      "“Guardians of the Galaxy Vol. 2,” Christopher Townsend, Guy Williams, Jonathan Fawkner, Dan Sudick",
      "“Kong: Skull Island,” Stephen Rosenbaum, Jeff White, Scott Benza, Mike Meinardus",
      "“Star Wars: The Last Jedi,”  Ben Morris, Mike Mulholland, Chris Corbould, Neal Scanlan",
      "“War for the Planet of the Apes,” Joe Letteri, Dan Lemmon, Daniel Barrett, Joel Whist"
    ],

    points: 2
  }
];

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries

  return knex("Categories")
    .then(() => {
      // Inserts seed entries

      const oscarsWithoutOptions = oscars.map(oscar => {
        return { pool: 4, name: oscar.name, points: oscar.points };
      });

      return knex("Categories").insert(oscarsWithoutOptions);
    })

    .then(() => {
      const optionPromises = [];

      oscars.forEach(category => {
        category.choices.forEach(option => {
          optionPromises.push(createOption(knex, option, category));
        });
      });

      return Promise.all(optionPromises);
    });
};

const createOption = (knex, option, category) => {
  return knex("Categories")
    .where("name", category.name)

    .where("pool", 4)

    .first()

    .then(categoryRecord => {
      return knex("Options").insert({
        name: option,

        category: categoryRecord.id
      });
    });
};
