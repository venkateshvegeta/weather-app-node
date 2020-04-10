const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(path.join(__dirname,'../public'))
const publicDirPath = path.join(__dirname,'../public')
const app = express()
const partialdir = path.join(__dirname,'../templates/partial')
app.set('views',path.join(__dirname,'../templates/views'))
app.set('view engine', 'hbs')
app.use(express.static(publicDirPath))
hbs.registerPartials(partialdir)

app.get('',(req,res) => {
    res.render('index',{
        title:'Weather App',
        author:'Venkatesh'
    })
})
app.get("/help", (req,res) => {
    res.render('help',{
        title:'Help',
        message: 'This is a Help Page',
        author:'venkatesh'
    })
})

app.get("/about", (req,res) => {
    res.render('about',{
        title:'About',
        message: 'This is a about page',
        author:'Venkatesh'
    })
})

app.get("/weather",(req,res) => {
    const location = req.query.location
    if(!location) {
        return res.send({
            error:'Location is not defined'
        })
    }
    geocode(location, (error, {longitude,latitude,locationResult}={}) => {
        if(error){
            return res.send({error})
        } else {
            forecast(longitude,latitude,(error,forecastdata)=>{
                if(error){
                    return res.send({error})
                }
                res.send({
                    searchedLocation:location,
                    forecastlocation:locationResult,
                    report:forecastdata
                })
            })
        }
    })
    
})

app.get("/help/*",(req,res) => {
    res.render('error',{
        title:'Http Request Error',
        message:'Requested help Page Not Found'
    })
})
app.get("*",(req,res) => {
    res.render('error',{
        title:'Http Request Error',
        message:'404 Page Not Found'
    })
})
app.listen(3000,()=>{
    console.log('Express server starts')
})