const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require('./cities');
const { places, descriptors } = require('./seedhelpers')

main().catch((err) => console.log(err));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp");
    console.log("mongo connected!");
}

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '6708fdb497c7f3602cdcb208',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/diy3icwuo/image/upload/v1728815207/YelpCamp/zfw7u4jwegrxdcdc2izp.jpg',
                    filename: 'YelpCamp/zfw7u4jwegrxdcdc2izp',
                },
                {
                    url: 'https://res.cloudinary.com/diy3icwuo/image/upload/v1728815209/YelpCamp/optzhk5zfsin9bq00pyl.jpg',
                    filename: 'YelpCamp/optzhk5zfsin9bq00pyl',
                },
                {
                    url: 'https://res.cloudinary.com/diy3icwuo/image/upload/v1728815209/YelpCamp/ksqa8tsdbinlo6l2o5az.jpg',
                    filename: 'YelpCamp/ksqa8tsdbinlo6l2o5az',
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})