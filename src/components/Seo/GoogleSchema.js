import React from 'react';
import Helmet from 'react-helmet';

const GoogleSchema = React.memo(
    ({isArticle, title, pageURL, imageURL, datePublished}) => {
        const baseSchema = [
            {
                "@context": "https://schema.org",
                "@type": "NewsArticle",
                "mainEntityOfPage": {
                    "@type": "WebPage",
                    "@id": "https://bugdetective.netlify.app/"
                }
            },
        ]
        const schema = isArticle ?
            [
                ...baseSchema,
                {
                    "headline": title,
                    "url": pageURL,
                    "image": imageURL,
                    "datePublished": datePublished,
                    "author": {
                        "@type": "Person",
                        "name": "黃瑞成"
                    }
                }
            ]
            :
            baseSchema;


        return (
            <Helmet>
                <script type="application/ld+json">
                    {
                        JSON.stringify(schema)
                    }
                </script>

            </Helmet>
        )
    }




)

export default GoogleSchema