const express = require('express');
const fs = require('fs');
const app = express ();



app.use(express.json());
app.use((req,res,next)=>{
    console.log('Hello Middleware');
    next();
});
app.use((req, res, next)=>{
    req.requestTime = new Date().toISOString();
    next();
});
 const tours= JSON.parse(
    fs.readFileSync(`${__dirname}/data/tours-simple.json`)
 );

 const getAllTours = (req, res)=> {
    console.log(req.requestTime);

    res.status(200).json({
        status : 'success',
        requestedAt: req.requestTime,
        results: tours.length,
        data: {
            tours
        }
    });

 };

 const getTour= (req, res)=>{
    console.log(req.params);
    const id = req.params.id * 1;
    const tour = tours.fins(el => el.id === id);

    if(!tour){
        return res.status(404).json({
            status:' fail',
            massage: 'invalid ID'
        });
}
    res. status(200).json({
        status:'sucess',
        data :{
            tour
        }
    });

 };

 const createTour = (req, res)=> {

    const newId =tours[tours.length-1].id+1;
    const newTour= object.assign({ id:newId}, req.body);

    tours.push(newTour);

    fs.writeFile(`${__dirname}/data/tours-simple.json`,
    JSON.stringify(tours),
    err => {
        res.status(201).json({
            status :'success',
            data: {
                tour:newTour
            }
        });
    }
    );

 };

 const updateTour = (req, res) =>{
    if(req.params.id *1>tours.length){
        return res.status(404).json({
            status:'fail',
            message:'invalid ID'
        });
    }
    res.status(200).json({
        status:'success',
        data:{
            tour:'<updated tour here........>'
        }
    });
 };

 const deleteTour = (req, res)=>{
    if(req.params.id *1 > tours.length){
        return res.status(404).json({
            status:'fail',
            message:'Invalid ID'
        });
    }
    res,status(204).json({
        status:'success',
        data: null
    });
 };


 app
    .route('/api/v1/tours')
    .get(getAllTours)
    .post(createTour);
app
    .route('/api/v1/tours/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour);



// app.get("/", (req, res)=> {

//     res.status(200).send("Helllo i am nayeem");
// })
const port = 3000;
app.listen(port, ()=>{
    console.log(`app is running ${port}`);

}
)