const normalizeValue = (value) => String(value ?? "").trim();

const AUTHOR_DIRECTORY = {
	"83937449": "Monica Lucas",
	"73855012": "Lori Hart",
	"49986179": "Gayle Hicks",
	"90432259": "Stacy Long",
	"40460691": "Mamie Barnett",
	"87818782": "Jimmy Wright",
	"52045866": "Claude Banks",
	"39623982": "Ida Chapman",
	"18556210": "Fred Ryan",
	"55757699": "Nicholas Daniels",
	"31906377": "Karla Sharp",
	"72378156": "Franklin Greer",
};

const pickFirstNonEmpty = (values = []) => {
	for (const value of values) {
		const normalized = normalizeValue(value);
		if (normalized) {
			return normalized;
		}
	}

	return "";
};

export const getCreatorDisplayName = (item = {}) => {
	const creatorName = pickFirstNonEmpty([
		item.creatorName,
		item.creator,
		item.authorName,
		item.author,
		item.name,
		AUTHOR_DIRECTORY[normalizeValue(item.creatorId)],
		AUTHOR_DIRECTORY[normalizeValue(item.authorId)],
	]);

	return creatorName || "Unknown Creator";
};

export const getOwnerDisplayName = (item = {}) => {
	const ownerName = pickFirstNonEmpty([
		item.ownerName,
		item.owner,
		item.currentOwner,
		item.holderName,
		AUTHOR_DIRECTORY[normalizeValue(item.ownerId)],
		AUTHOR_DIRECTORY[normalizeValue(item.currentOwnerId)],
	]);

	return ownerName || "Unknown Owner";
};

export const getCreatorRouteId = (item = {}) =>
	pickFirstNonEmpty([item.creatorId, item.authorId, item.author]);

export const getOwnerRouteId = (item = {}) =>
	pickFirstNonEmpty([item.ownerId, item.currentOwnerId]);

export const getAuthorDisplayName = (item = {}) => {
	const creatorName = getCreatorDisplayName(item);
	if (creatorName !== "Unknown Creator") {
		return creatorName;
	}

	const ownerName = getOwnerDisplayName(item);
	if (ownerName !== "Unknown Owner") {
		return ownerName;
	}

	return "Unknown Author";
};

export const buildAuthorProfile = (authorId = "", item = {}) => {
	const normalizedAuthorId = normalizeValue(authorId);
	const name = item.authorName || item.name || item.author || item.creator || item.owner || "Unknown Author";

	return {
		id: normalizedAuthorId,
		name,
		username: normalizedAuthorId ? `@${normalizedAuthorId}` : "@unknown",
		wallet: item.wallet || item.address || "No wallet linked",
		followers: item.followers ? `${item.followers} followers` : `${item.likes ?? 0} followers`,
	};
};
