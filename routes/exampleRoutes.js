const Path = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

// const Survey = mongoose.model('surveys');

module.exports = app => {
    // app.get('/api/surveys', requireLogin, async (req, res) => {
    //     const surveys = await Survey.find({ _user: req.user.id }).select({ recipients: false });
    //     res.send(surveys);
    // });

    // app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    //     res.send('Thanks for voting!');
    // });

    // app.post('/api/surveys/webhooks', (req, res) => {
    //     const p = new Path('/api/surveys/:surveyId/:choice');
    //     const match = p.test(new URL(req.body.url).pathname);

    //     if(match){
    //         Survey.updateOne({
    //             _id: match.surveyId,
    //             recipients: {
    //                 $elemMatch: { email: req.body.recipient, responded: false }
    //             }
    //         },{
    //             $inc: { [match.choice]: 1 },
    //             $set: { 'recipients.$.responded': true },
    //             lastResponded: new Date()
    //         }).exec();

    //         // updateOne, atualiza o registro selecionado direto no BD
    //         // $inc = encontra a prop chamada [nome] e incrementa com o valor 1
    //         // $set = encontra a prop nome e atualiza o valor, o $ é para atualizar apenas a encontrada em $elemMatch, sem o $ ele atualiza toda a lista da prop
    //     }
    //     res.send({});
    // });

    // app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    //     const {title, subject, body, recipients} = req.body;

    //     const survey = new Survey({
    //         title, // same that title: title
    //         subject, // same that subject: subject 
    //         body, // same that body: body
    //         recipients: recipients.split(',').map(email => ({email: email.trim()})), // same that recipients: recipients.split(',').map(email => { return {email: email.trim()}})
    //         _user: req.user.id,
    //         dateSent: Date.now()
    //     });

    //     const mailer = new Mailer(survey, surveyTemplate(survey));
    //     await mailer.send();

    //     try{
    //         await survey.save();
    //         req.user.credits -= 1;
    //         const user = await req.user.save();
    //         res.send(user);
    //     } catch(err){
    //         res.status(422).send(err);
    //     }
    // });
};