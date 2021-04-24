const nextSeoConfig = {
  title: 'template-admin',
  titleTemplate: 'template-admin',
  description: 'template-admin',
  openGraph: {
    url: process.env.webUrl,
    type: 'website',
    images: [
      {
        url: `${process.env.webUrl}/meta/meta-default.jpg`,
        width: 1200,
        height: 630,
        alt: 'template-admin',
      },
    ],
  },
}

export default nextSeoConfig
