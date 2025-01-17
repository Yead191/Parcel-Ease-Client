
const siteConfig = {

    name: "Asadur Rahaman Yead",
    description: "A brief description of your site.",
    url: "https://yourwebsite.com",
    links: {
        twitter: "https://twitter.com/yourprofile",
        github: "https://github.com/yourrepo",
    },
};
export function SiteFooter() {
    return (
        <div>

            <footer className="border-grid border-t py-6 md:px-8 md:py-0">
                <div className="container-wrapper">
                    <div className="container py-4">
                        <div className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
                            Built by{siteConfig.name}
                            <a
                                href={siteConfig.links.twitter}
                                target="_blank"
                                rel="noreferrer"
                                className="font-medium underline underline-offset-4"
                            >
                                Parcel Ease
                            </a>
                            . The source code is available on{" "}
                            <a
                                href={siteConfig.links.github}
                                target="_blank"
                                rel="noreferrer"
                                className="font-medium underline underline-offset-4"
                            >
                                GitHub
                            </a>
                            .
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}