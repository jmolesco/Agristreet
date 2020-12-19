const PoitoreHTMLTemplate = `
<html>

<head>
    <title>
        Poitore Customer Care
    </title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style type="text/css">
        .container {
            width: 100%;
            background-color: snow;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .sub-container {
            width: 82%;
            margin-left: 9%;
            margin-right: 9%;
            background-color: whitesmoke;
        }

        .sub-header > img {
            margin-top: 3%;
            width: 500px;
            height: 190px;
        }

        .sub-header {
            width: 100%;
            text-align: center;
        }

        .header-title-container {
            width: 100%;
        }

        .header-title > p {
            font-size: 3em;
            width: 100%;
            text-align: center;
            margin: 0.25%;
        }

        .body-message-box {
            padding-top: 1%;
            padding-left: 3%;
            padding-right: 3%;
            padding-bottom: 1%;
        }

        .body-content {
            padding-left: 3%;
            padding-right: 3%;
            padding-bottom: 5%;
            text-align: justify;
        }

        .resetpassword-container {
            width: 100%;
        }

        .resetpassword-button {
            width: 100%;
            text-align: center;
            padding-top: 1.5%;
            padding-bottom: 1.5%;
        }

        .container-status {
            border: none;
            background: rgb(26, 115, 232);
            padding: 10px 22px;
            color: #fff;
            border-radius: 5px;
            text-align: center;
            font-family: Segoe UI Semibold;
            font-size: 16px;
            text-decoration: none;
            width: 20%;
        }


        .body-message-box {
            padding-top: 3%;
            padding-left: 3%;
            padding-right: 3%;
        }

        .body-content {
            padding-left: 3%;
            padding-right: 3%;
            padding-bottom: 5%;
            text-align: justify;
        }

        .resetpassword-container {
            width: 100%;
        }


        .italic {
            font-style: italic;
        }

        @media only screen and (max-width: 480px) {
            .sub-container {
                width: 96%;
                margin-left: 2%;
                margin-right: 2%;
                background-color: whitesmoke;
            }

            .sub-header > img {
                margin-top: 3%;
                width: 300px;
                height: 100px;
            }

            .header-title > p {
                font-size: 2em;
            }


            .resetpassword-button {
                width: 100%;
                text-align: center;
                padding-top: 1.5%;
                padding-bottom: 1.5%;
            }

            .container-status {
                border: none;
                background: rgb(26, 115, 232);
                padding: 10px 22px;
                color: #fff;
                border-radius: 5px;
                text-align: center;
                font-family: Segoe UI Semibold;
                font-size: 16px;
                text-decoration: none;
                width: 40%;
            }
        }
        @media only screen and (max-width: 375px) {
            .sub-container {
                width: 96%;
                margin-left: 2%;
                margin-right: 2%;
                background-color: whitesmoke;
            }

            .sub-header > img {
                margin-top: 3%;
                width: 300px;
                height: 100px;
            }

            .header-title > p {
                font-size: 2em;
            }


            .resetpassword-button {
                width: 100%;
                text-align: center;
                padding-top: 1.5%;
                padding-bottom: 1.5%;
            }

            .container-status {
                border: none;
                background: rgb(26, 115, 232);
                padding: 10px 22px;
                color: #fff;
                border-radius: 5px;
                text-align: center;
                font-family: Segoe UI Semibold;
                font-size: 16px;
                text-decoration: none;
                width: 45%;
            }
        }
    </style>
</head>

<body>
    <div class="container">

        <div class="sub-container">
            <div class="sub-header">
                <img title="kyc logo" src="https://poitore-images.s3-ap-northeast-1.amazonaws.com/poitorelogo.png">
            </div>

            <div class="header-title-container">
                <div class="header-title">
                    <p><span>HeaderName</span></p>
                </div>
            </div>
            <div class="body-message">
                <div class="body-message-box">
                    <span>Hi Name,</span>
                </div>
                <div class="body-content">
                    <p>
                        ContentMessage1
                    </p>
                    <p>
                        ContentMessage2

                    </p>
                    <p>
                       ContentMessage3
                       <br> Notes
                    </p>
					<p>
                       ContentMessage4
                    </p>
                    <p>
					Have a great day ahead!
					<br />
					Poitore Team
					</p>

                </div>

            </div>
        </div>

    </div>
</body>

</html>
`;

const cMessage1 = 'Your Task Declaration of {TaskName} on {TaskDeclareDate} at {TaskDeclareTime} was approved.';
const cMessage2 = 'You have earned {ClientEarnedPoints} points. Your Current Points is now {CurrPoints}.';
const cMessage3 = 'Additional Memo by the Administrator:';
const cMessage3_1 = 'Please check the app for further reason.';
const cMessage4 = 'Reference ID: {TaskDeclareId}';

const cRejectMessage1 = 'Your Task Declaration of {TaskName} on {TaskDeclareDate} at {TaskDeclareTime} was rejected.';
const cRejectMessage2 = 'You have lost {ClientEarnedPoints} points. Your Current Points is now {CurrPoints}.';

module.exports = {
  PoitoreHTMLTemplate,
  cMessage1,
  cMessage2,
  cMessage3,
  cMessage3_1,
  cMessage4,
  cRejectMessage1,
  cRejectMessage2,

};
