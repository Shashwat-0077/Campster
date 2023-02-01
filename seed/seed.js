const data = require("./Ind_data.json");
const title = require("./description");
const mongoose = require("mongoose");
const Campster = require("../models/campsterSchema");

mongoose
    .connect("mongodb://localhost:27017/campster")
    .then(() => {
        console.log("DB is connected");
    })
    .catch((err) => {
        console.log("ERROR : ", err);
    });

let seed_into = async () => {
    await Campster.deleteMany({});

    for (let i = 0; i < 50; i++) {
        let rand_num = Math.floor(Math.random() * 1600);
        let entry = Campster({
            place: data[rand_num].city,
            price: Math.floor(Math.random() * 800 + 200),
            state: data[rand_num].admin_name,
            title: `${
                title.descriptors[
                    Math.floor(Math.random() * title.descriptors.length)
                ]
            } ${title.plates[Math.floor(Math.random() * title.plates.length)]}`,
            images: [
                {
                    url: "https://images.unsplash.com/photo-1614069565320-172174347232?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2530&q=80",
                    filename: "sample",
                },
            ],
            author: "628534935791256524d5282b",
            description:
                "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea dolorem quasi alias exercitationem iusto quo assumenda at nesciunt, deserunt consequuntur nulla quas ut nostrum omnis reprehenderit quam unde, error illo.",
            geometry: {
                type: "Point",
                coordinates: [data[rand_num].lng, data[rand_num].lat],
            },
        });
        entry.save();
    }
};

seed_into();
