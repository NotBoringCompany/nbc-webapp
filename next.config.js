const withFonts = require("next-fonts");
const withVideos = require("next-videos");
const { createSecureHeaders } = require("next-secure-headers");

module.exports = withVideos(
	withFonts({
		webpack(config, options) {
			return config;
		},
		async headers() {
			return [
				{
					source: "/(.*)",
					headers: createSecureHeaders({
						contentSecurityPolicy: {
							directives: {
								frameAncestors: ["self"],
								styleSrc: ["'self'", "'unsafe-inline'"],
								imgSrc: [
									"'self'",
									"realmhunter-kos.fra1.cdn.digitaloceanspaces.com",
								],
								baseUri: "self",
							},
						},
						forceHTTPSRedirect: [
							true,
							{ maxAge: 63072000, includeSubDomains: true },
						],
						noopen: "noopen",
						nosniff: "nosniff",
						xssProtection: "sanitize",
						referrerPolicy: "strict-origin-when-cross-origin",
					}),
				},
			];
		},
	})
);
