const express = require("express");
const mySql_connection = require("../my-sql/mysql");
const routes = express.Router();
const bcrypt = require('bcrypt');

const session = require('express-session');

routes.get('/checkloggedin', (req,res) => {
    if (req.session.logged_in){
        res.json(req.session);
    } else {
        res.status(401).json({logged_out:true})
    }
});

/* Profile Page */
routes.get('/charityrepresentid', (req, res) => {
                
        let query = `SELECT charity_id,name FROM charity
                    ORDER BY name ASC
                ;`;

    mySql_connection.beginTransaction();

    mySql_connection.query(query, (err, result) => {

        if (err) {
            console.log(err);
            mySql_connection.rollback();

            if (err.code === 'PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR') {

                res.status(500).send('Internal Server Error');
            }
            else if (err.errno = 1062) {

                res.status(409).send('already exist');
            }
            else {
                res.status(422).send('Unable to Process')
            }

        }
        else {
            mySql_connection.commit();
            console.log(result);
            res.send(result);
            
        }

    });

});


routes.post('/individualregister', (req, res) => {
     let hash=null ;
   
        const salt_rounds = 10;
        const salt = bcrypt.genSaltSync(salt_rounds);
         hash= bcrypt.hashSync(req.body.i_password, salt);
        
        console.log(req.body);
        let query = `INSERT INTO individual
            (first_name,
            last_name,
            email,
            password,
            total_donated,
            charity_represent_id)
            VALUES
            (
                '${req.body.i_fname}',
                '${req.body.i_lname}',
                '${req.body.i_email}',
                '${hash}',
                '${0}',
                '${req.body.i_charityrepresentid}')
                
                
                ;`;

    mySql_connection.beginTransaction();

    mySql_connection.query(query, (err, result) => {

        if (err) {
            console.log(err);
            mySql_connection.rollback();

            if (err.code === 'PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR') {

                res.status(500).send('Internal Server Error');
            }
            else if (err.errno = 1062) {

                res.status(409).send('already exist');
            }
            else {
                res.status(422).send('Unable to Process')
            }

        }
        else {
            mySql_connection.commit();
            
        }

    });

    let query2 = `INSERT INTO fundraiser (
        name, total_raised, about, 
        social_link, target, merchant_id, 
        enabled, individual_owner_id)
                VALUES (
                    "Name of Fundraiser", 0, "Give us information about your cause!", 
                    "Website link of cause", 0, "Enter your Paypal Merchant ID here", 
                    0, (SELECT individual_id FROM individual ORDER BY individual_id DESC LIMIT 1))
            
            
            ;`;

    mySql_connection.beginTransaction();

    mySql_connection.query(query2, (err2, result2) => {

        if (err2) {
            console.log(err2);
            mySql_connection.rollback();

            if (err2.code === 'PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR') {

                res.status(500).send('Internal Server Error');
            }
            else if (err2.errno = 1062) {

                res.status(409).send('already exist');
            }
            else {
                res.status(422).send('Unable to Process')
            }

        }
        else {
            mySql_connection.commit();
            res.send('success');
        }

    });

});


routes.post('/charityregister', (req, res) => {
    let hash=null ;
       const salt_rounds = 10;
        const salt = bcrypt.genSaltSync(salt_rounds);
         hash= bcrypt.hashSync(req.body.c_password, salt);
        
        let query = `INSERT INTO charity
            (name,
            country,
            reg_number,
            total_raised,
            merchant_id,
            about,
            social_link,
            target,
            points,
            email,
            password)
            VALUES
            (
                '${req.body.c_charityName}',
                '${req.body.c_country}',
                '${req.body.c_reg_no}',
                '${0}',
                '${req.body.c_merchant_id}',
                '${'Give us a short summary about the charity!'}',
                '${'Post some links towards personal websites'}',
                '${0}',
                '${0}',
                '${req.body.c_email}',
                '${hash}')               
                ;`;

   mySql_connection.beginTransaction();

    mySql_connection.query(query, (err, result) => {

        if (err) {
            console.log(err);
            mySql_connection.rollback();

            if (err.code === 'PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR') {

                res.status(500).send('Internal Server Error');
            }
            else if (err.errno = 1062) {

                res.status(409).send('already exist');
            }
            else {
                res.status(422).send('Unable to Process')
            }

        }
        else {
            mySql_connection.commit();
            res.send('success')
        }

    });


});

routes.post('/loginIndividual', (req, res) => {
         
        console.log(req.body);      

         let query=`SELECT * FROM individual WHERE email='${req.body.li_email}'`;

   mySql_connection.beginTransaction();

    mySql_connection.query(query, (err, result) => {

                console.log(result);

        if (err) {
            console.log(err);
            mySql_connection.rollback();

            if (err.code === 'PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR') {

                res.status(500).send('Internal Server Error');
            }
            else if (err.errno = 1062) {

                res.status(409).send('already exist');
            }
            else {
                res.status(422).send('Unable to Process')
            }

        }
        else {

          if(result.length===0){

            res.status(404).send('User Not Exist');
                  return ; 
          }

           let verify= bcrypt.compareSync(req.body.li_password,result[0].password); // true
           if(verify){
           

            mySql_connection.commit();


            req.session.logged_in = true;
            req.session.individual = true;
            req.session.user = result[0].individual_id;            

            res.json(req.session);
           }
           else{
            mySql_connection.commit();
            res.status(404).send('User Not Exist');

           }
        }

    });

});

routes.post('/loginCharity', (req, res) => {
         
        console.log(req.body);      

        let query=`SELECT * FROM charity WHERE  email='${req.body.lc_email}'`;

    mySql_connection.beginTransaction();

    mySql_connection.query(query, (err, result) => {

                console.log(result);

        if (err) {
            console.log(err);
            mySql_connection.rollback();

            if (err.code === 'PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR') {

                res.status(500).send('Internal Server Error');
            }
            else if (err.errno = 1062) {

                res.status(409).send('already exist');
            }
            else {
                res.status(422).send('Unable to Process')
            }

        }
        else {

        if(result.length===0){

            res.status(404).send('User Not Exist');
                return ; 
        }

        let verify= bcrypt.compareSync(req.body.lc_password,result[0].password); // true
        if(verify){
        

            mySql_connection.commit();

            req.session.logged_in = true;
            req.session.individual = false;
            req.session.user = result[0].charity_id;            

            res.json(req.session);

        }
        else{
            mySql_connection.commit();
            res.status(404).send('User Not Exist');

        }
        }

    });

    });



routes.post('/logout', (req, res) => {
    req.session.destroy();
    res.json({logged_out: true});
});

/* Profile Dashboard Pages */
routes.get('/profile/:id', (req, res) => {
                        
        let query = `SELECT * FROM indiprofiledashboardtofund
                    WHERE individual_id = ${req.params.id}
                ;`;

    mySql_connection.beginTransaction();

    mySql_connection.query(query, (err, result) => {

        if (err) {
            console.log(err);
            mySql_connection.rollback();

            if (err.code === 'PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR') {

                res.status(500).send('Internal Server Error');
            }
            else if (err.errno = 1062) {

                res.status(409).send('already exist');
            }
            else {
                res.status(422).send('Unable to Process')
            }

        }
        else {
            mySql_connection.commit();
            console.log(result);
            res.send(result);
            
        }

    });

});

routes.delete('/profile/:id', (req, res) => {
                        
        let query = `DELETE FROM individual
                    WHERE individual_id = ${req.params.id}
                ;`;

    mySql_connection.beginTransaction();

    mySql_connection.query(query, (err, result) => {

        if (err) {
            console.log(err);
            mySql_connection.rollback();

            if (err.code === 'PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR') {

                res.status(500).send('Internal Server Error');
            }
            else if (err.errno = 1062) {

                res.status(409).send('already exist');
            }
            else {
                res.status(422).send('Unable to Process')
            }

        }
        else {
            mySql_connection.commit();
            
            req.session.destroy();
            res.send("deleted");
            
        }

    });

});

routes.get('/profilecharity/:id', (req, res) => {
                    
        let query = `SELECT * FROM charity
                    WHERE charity_id = ${req.params.id}
                ;`;

    mySql_connection.beginTransaction();

    mySql_connection.query(query, (err, result) => {

        if (err) {
            console.log(err);
            mySql_connection.rollback();

            if (err.code === 'PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR') {

                res.status(500).send('Internal Server Error');
            }
            else if (err.errno = 1062) {

                res.status(409).send('already exist');
            }
            else {
                res.status(422).send('Unable to Process')
            }

        }
        else {
            mySql_connection.commit();
            console.log(result);
            res.send(result);
            
        }

    });

});


/* Charities Page */
routes.get('/charitycards', (req, res) => {
                
        let query = `SELECT charity_id,name,about,points FROM charity
                    ORDER BY points DESC
                ;`;

    mySql_connection.beginTransaction();

    mySql_connection.query(query, (err, result) => {

        if (err) {
            console.log(err);
            mySql_connection.rollback();

            if (err.code === 'PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR') {

                res.status(500).send('Internal Server Error');
            }
            else if (err.errno = 1062) {

                res.status(409).send('already exist');
            }
            else {
                res.status(422).send('Unable to Process')
            }

        }
        else {
            mySql_connection.commit();
            console.log(result);
            res.send(result);
            
        }

    });

});

routes.get('/charitylandingpage/:id', (req, res) => {
                    
        let query = `SELECT * FROM charity
                    WHERE charity_id = ${req.params.id}
                ;`;

    mySql_connection.beginTransaction();

    mySql_connection.query(query, (err, result) => {

        if (err) {
            console.log(err);
            mySql_connection.rollback();

            if (err.code === 'PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR') {

                res.status(500).send('Internal Server Error');
            }
            else if (err.errno = 1062) {

                res.status(409).send('already exist');
            }
            else {
                res.status(422).send('Unable to Process')
            }

        }
        else {
            mySql_connection.commit();
            console.log(result);
            res.send(result);
            
        }

    });

});

routes.get('/charityeditlandingpage/:id', (req, res) => {
                    
        let query = `SELECT * FROM charity
                    WHERE charity_id = ${req.params.id}
                ;`;

    mySql_connection.beginTransaction();

    mySql_connection.query(query, (err, result) => {

        if (err) {
            console.log(err);
            mySql_connection.rollback();

            if (err.code === 'PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR') {

                res.status(500).send('Internal Server Error');
            }
            else if (err.errno = 1062) {

                res.status(409).send('already exist');
            }
            else {
                res.status(422).send('Unable to Process')
            }

        }
        else {
            mySql_connection.commit();
            console.log(result);
            res.send(result);
            
        }

    });

});

routes.patch('/charityeditlandingpage/:id', (req, res) => {
                    
        let query = `UPDATE charity
                    SET about= "${req.body.about}", social_link= "${req.body.sociallink}", target= ${req.body.target}
                    WHERE charity_id= ${req.params.id}`;

    mySql_connection.beginTransaction();

    mySql_connection.query(query, (err, result) => {

        if (err) {
            console.log(err);
            mySql_connection.rollback();

            if (err.code === 'PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR') {

                res.status(500).send('Internal Server Error');
            }
            else if (err.errno = 1062) {
                
                res.status(409).send('already exist');
            }
            else {
                res.status(422).send('Unable to Process')
            }

        }
        else {
            mySql_connection.commit();
            console.log("success");
            res.send("success");
            
        }

    });

});

routes.patch('/charitylandingpage/:id', (req, res) => {
                        
        let query = `UPDATE charity
                    SET total_raised= total_raised + ${req.body.total_raised}
                    WHERE charity_id= ${req.params.id}`;

    mySql_connection.beginTransaction();

    mySql_connection.query(query, (err, result) => {

        if (err) {
            console.log(err);
            mySql_connection.rollback();

            if (err.code === 'PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR') {

                res.status(500).send('Internal Server Error');
            }
            else if (err.errno = 1062) {
                
                res.status(409).send('already exist');
            }
            else {
                res.status(422).send('Unable to Process')
            }

        }
        else {
            mySql_connection.commit();
            console.log("success");
            res.send("success");
            
        }

    });

});

routes.patch('/individualdonateeffect', (req, res) => {
                        
        let query = `UPDATE individual
                    SET total_donated= total_donated + ${req.body.total_donated}
                    WHERE individual_id= ${req.body.userid}`;

    mySql_connection.beginTransaction();

    mySql_connection.query(query, (err, result) => {

        if (err) {
            console.log(err);
            mySql_connection.rollback();

            if (err.code === 'PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR') {

                res.status(500).send('Internal Server Error');
            }
            else if (err.errno = 1062) {
                
                res.status(409).send('already exist');
            }
            else {
                res.status(422).send('Unable to Process')
            }

        }
        else {
            mySql_connection.commit();
            console.log("success");
            res.send("success");
            
        }

    });

});

/* Fundraiser Page */
routes.get('/fundraisercards', (req, res) => {
                    
        let query = `SELECT * FROM fundraiserowner
                        WHERE enabled = 1
                        ORDER BY total_raised ASC
                        `;

    mySql_connection.beginTransaction();

    mySql_connection.query(query, (err, result) => {

        if (err) {
            console.log(err);
            mySql_connection.rollback();

            if (err.code === 'PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR') {

                res.status(500).send('Internal Server Error');
            }
            else if (err.errno = 1062) {

                res.status(409).send('already exist');
            }
            else {
                res.status(422).send('Unable to Process')
            }

        }
        else {
            mySql_connection.commit();
            console.log(result);
            res.send(result);
            
        }

    });

});

routes.get('/fundraiserlandingpage/:id', (req, res) => {
                    
        let query = `SELECT * FROM fundraiserowner
                    WHERE fundraiser_id = ${req.params.id}
                ;`;

    mySql_connection.beginTransaction();

    mySql_connection.query(query, (err, result) => {

        if (err) {
            console.log(err);
            mySql_connection.rollback();

            if (err.code === 'PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR') {

                res.status(500).send('Internal Server Error');
            }
            else if (err.errno = 1062) {

                res.status(409).send('already exist');
            }
            else {
                res.status(422).send('Unable to Process')
            }

        }
        else {
            mySql_connection.commit();
            console.log(result);
            res.send(result);
            
        }

    });

});

routes.get('/fundraisereditlandingpage/:id', (req, res) => {
                    
        let query = `SELECT * FROM fundraiserowner
                    WHERE individual_owner_id = ${req.params.id}
                ;`;

    mySql_connection.beginTransaction();

    mySql_connection.query(query, (err, result) => {

        if (err) {
            console.log(err);
            mySql_connection.rollback();

            if (err.code === 'PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR') {

                res.status(500).send('Internal Server Error');
            }
            else if (err.errno = 1062) {

                res.status(409).send('already exist');
            }
            else {
                res.status(422).send('Unable to Process')
            }

        }
        else {
            mySql_connection.commit();
            console.log(result);
            res.send(result);
            
        }

    });

});

routes.patch('/fundraisereditlandingpage/:id', (req, res) => {
                
        let query = `UPDATE fundraiser
                    SET name= "${req.body.name}", about= "${req.body.about}", social_link= "${req.body.sociallink}", target= ${req.body.target}, merchant_id= "${req.body.merchantid}",enabled= ${req.body.enabled}
                    WHERE individual_owner_id= ${req.params.id}`;

    mySql_connection.beginTransaction();

    mySql_connection.query(query, (err, result) => {

        if (err) {
            console.log(err);
            mySql_connection.rollback();

            if (err.code === 'PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR') {

                res.status(500).send('Internal Server Error');
            }
            else if (err.errno = 1062) {
                
                res.status(409).send('already exist');
            }
            else {
                res.status(422).send('Unable to Process')
            }

        }
        else {
            mySql_connection.commit();
            console.log("success");
            res.send("success");
            
        }

    });

});

routes.patch('/fundraiserlandingpage/:id', (req, res) => {
                            
        let query = `UPDATE fundraiser
                    SET total_raised= total_raised + ${req.body.total_raised}
                    WHERE fundraiser_id= ${req.params.id}`;

    mySql_connection.beginTransaction();

    mySql_connection.query(query, (err, result) => {

        if (err) {
            console.log(err);
            mySql_connection.rollback();

            if (err.code === 'PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR') {

                res.status(500).send('Internal Server Error');
            }
            else if (err.errno = 1062) {
                
                res.status(409).send('already exist');
            }
            else {
                res.status(422).send('Unable to Process')
            }

        }
        else {
            mySql_connection.commit();
            console.log("success");
            res.send("success");
            
        }

    });

});

routes.patch('/individualdonateeffectfund', (req, res) => {
                        
        let query = `UPDATE individual
                    SET total_donated= total_donated + ${req.body.total_donated}
                    WHERE individual_id= ${req.body.userid}`;

    mySql_connection.beginTransaction();

    mySql_connection.query(query, (err, result) => {

        if (err) {
            console.log(err);
            mySql_connection.rollback();

            if (err.code === 'PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR') {

                res.status(500).send('Internal Server Error');
            }
            else if (err.errno = 1062) {
                
                res.status(409).send('already exist');
            }
            else {
                res.status(422).send('Unable to Process')
            }

        }
        else {
            mySql_connection.commit();
            console.log("success");
            res.send("success");
            
        }

    });

});

/* Minigame Page */
routes.get('/quiz', (req, res) => {
        
        let query = `        
                SELECT * FROM quiz
                    ORDER BY RAND()
                    LIMIT 1
                ;`;

    mySql_connection.beginTransaction();

    mySql_connection.query(query, (err, result) => {

        if (err) {
            console.log(err);
            mySql_connection.rollback();

            if (err.code === 'PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR') {

                res.status(500).send('Internal Server Error');
            }
            else if (err.errno = 1062) {

                res.status(409).send('already exist');
            }
            else {
                res.status(422).send('Unable to Process')
            }

        }
        else {
            mySql_connection.commit();
            console.log(result);
            res.send(result);
            
        }

    });

});

routes.patch('/quizcorrect', (req, res) => {
                    
        let query = `UPDATE indicharityteam
                    SET points = points + 1 
                    WHERE individual_id= ${req.body.userid}`;

    mySql_connection.beginTransaction();

    mySql_connection.query(query, (err, result) => {

        if (err) {
            console.log(err);
            mySql_connection.rollback();

            if (err.code === 'PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR') {

                res.status(500).send('Internal Server Error');
            }
            else if (err.errno = 1062) {
                
                res.status(409).send('already exist');
            }
            else {
                res.status(422).send('Unable to Process')
            }

        }
        else {
            mySql_connection.commit();
            console.log("success");
            res.send("success");
            
        }

    });

});


/* Leaderboards Page */
routes.get('/individualleaderboard', (req, res) => {
                    
        let query = `SELECT first_name,last_name,total_donated, 
                RANK() OVER ( ORDER BY total_donated DESC ) cRank
                FROM individual
                ;`;

    mySql_connection.beginTransaction();

    mySql_connection.query(query, (err, result) => {

        if (err) {
            console.log(err);
            mySql_connection.rollback();

            if (err.code === 'PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR') {

                res.status(500).send('Internal Server Error');
            }
            else if (err.errno = 1062) {

                res.status(409).send('already exist');
            }
            else {
                res.status(422).send('Unable to Process')
            }

        }
        else {
            mySql_connection.commit();
            console.log(result);
            res.send(result);
            
        }

    });

});

routes.get('/charityleaderboard', (req, res) => {
            
        let query = `SELECT name,total_raised, 
                RANK() OVER ( ORDER BY total_raised DESC ) cRank
                FROM charity
                ;`;

    mySql_connection.beginTransaction();

    mySql_connection.query(query, (err, result) => {

        if (err) {
            console.log(err);
            mySql_connection.rollback();

            if (err.code === 'PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR') {

                res.status(500).send('Internal Server Error');
            }
            else if (err.errno = 1062) {

                res.status(409).send('already exist');
            }
            else {
                res.status(422).send('Unable to Process')
            }

        }
        else {
            mySql_connection.commit();
            console.log(result);
            res.send(result);
            
        }

    });

});

routes.get('/fundraiserleaderboard', (req, res) => {
                    
        let query = `SELECT *,
            RANK() OVER ( ORDER BY total_raised DESC ) cRank
            FROM fundraiserowner`;

    mySql_connection.beginTransaction();

    mySql_connection.query(query, (err, result) => {

        if (err) {
            console.log(err);
            mySql_connection.rollback();

            if (err.code === 'PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR') {

                res.status(500).send('Internal Server Error');
            }
            else if (err.errno = 1062) {

                res.status(409).send('already exist');
            }
            else {
                res.status(422).send('Unable to Process')
            }

        }
        else {
            mySql_connection.commit();
            console.log(result);
            res.send(result);
            
        }

    });

});



module.exports = routes;