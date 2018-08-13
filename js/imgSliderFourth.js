if (true)
            {
                window.ieBrowserVersion = parseInt(window.navigator.userAgent.substring(30, window.navigator.userAgent.indexOf(".", 25)));
                if (window.ieBrowserVersion != 8) {
                    require(["jquery", "supersized", "kenburns", "mediabackgroundv1"], function ($, supersized, kenburns, MediabackgroundView) {
                        var oMediabackgroundV1 = new MediabackgroundView({
                            MediaConfig:
                                    {
                                        "intRandom": 0,
                                        "intSlideInterval": 3000,
                                        "intTransitionSpeed": 1100,
                                        "intVerticalCenter": 0,
                                        "lstImages": ["https://d1jxr8mzr163g2.cloudfront.net/78b83360-ecc0-4f6e-b577-1adb605b2408/5975f57c-6073-4af8-b703-ca9f97a3fc0d_l.jpeg", "https://d1jxr8mzr163g2.cloudfront.net/78b83360-ecc0-4f6e-b577-1adb605b2408/95d4033d-b906-4a1c-b870-f700d8e8d77e_l.jpeg", "https://d3ciwvs59ifrt8.cloudfront.net/9a3edc02-740a-429f-9b40-8005eb54e220/e5bb73f4-c021-4d3b-b2d2-251642cbac9d_l.jpeg", "https://d3ciwvs59ifrt8.cloudfront.net/5cb17842-0650-4f4e-b8de-9e23ab2300a8/09c22c46-fac8-4d91-8ae7-68715732f3b7_l.jpeg", "https://d3ciwvs59ifrt8.cloudfront.net/bf5a20fa-5c2f-4c0d-86ac-3839f9235a89/bac5d141-1ea2-4428-b4bf-116f98c88ecd_l.jpg", "https://d3ciwvs59ifrt8.cloudfront.net/9a3edc02-740a-429f-9b40-8005eb54e220/27518719-b679-4f4d-8834-6279bd1aefdc_l.jpeg", "https://d3ciwvs59ifrt8.cloudfront.net/9a3edc02-740a-429f-9b40-8005eb54e220/259b3b8e-efd1-46bd-9af9-a1576ff27875_l.jpeg", "https://d3ciwvs59ifrt8.cloudfront.net/9a3edc02-740a-429f-9b40-8005eb54e220/7b6fa2c0-3d18-4a55-a59b-51ba6c854b23_l.jpeg", "https://d3ciwvs59ifrt8.cloudfront.net/9a3edc02-740a-429f-9b40-8005eb54e220/26691450-384a-4b17-9fbc-b47dac478644_l.jpg", "https://d3ciwvs59ifrt8.cloudfront.net/9a3edc02-740a-429f-9b40-8005eb54e220/4078e027-23ff-4f94-b8c2-0ef659c56ed9_l.jpg"]
                                    },
                            SitePageModuleID: "ed061382-c32e-488b-a72d-6c25f2a51e3b"
                        }).render();
                        window.imgBg = oMediabackgroundV1;
                    });
                }
            }