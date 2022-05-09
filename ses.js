const aws = require("aws-sdk");

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require("./secrets"); // in dev they are in secrets.json which is listed in .gitignore
}

const ses = new aws.SES({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
    region: "eu-west-1", // Make sure this corresponds to the region in which you have verified your email address (or 'eu-west-1' if you are using the Spiced credentials)
});

module.exports.sendMail = (req, res, next) => {
    const promise = ses
        .sendEmail({
            Source: "Peanuuts Inc. <spotted.yam@spicedling.email>",
            Destination: {
                ToAddresses: [`spotted.yam+ ${email}`],
            },
            Message: {
                Body: {
                    Text: {
                        Data: `Your new code to reset your password is: ${code}`,
                    },
                },
                Subject: {
                    Data: "Your Code",
                },
            },
        })
        .promise();

    promise
        .then(() => {
            console.log("it worked!");
            next();
        })
        .catch((err) => console.log(err));
};
