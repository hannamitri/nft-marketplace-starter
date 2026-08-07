import { buildAuthorProfile, getAuthorDisplayName } from './authorProfiles';

describe('authorProfiles helpers', () => {
	const item = {
		authorId: 73855012,
		author: 'Lori Hart',
		wallet: '0xabc',
		likes: 12,
	};

	it('builds the profile from the same item data', () => {
		expect(buildAuthorProfile('73855012', item)).toMatchObject({
			id: '73855012',
			name: 'Lori Hart',
			username: '@73855012',
			wallet: '0xabc',
			followers: '12 followers',
		});
	});

	it('falls back to the author display name helper', () => {
		expect(getAuthorDisplayName({ authorId: 73855012 })).toBe('Author 73855012');
	});
});
