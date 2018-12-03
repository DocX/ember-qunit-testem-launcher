// Based on Java's String.hashCode, a simple but not
// rigorously collision resistant hashing function
export function generateTestHash(module: string, testName?: string) {
	const str = module + "\x1C" + testName;
	let hash = 0;

	for ( let i = 0; i < str.length; i++ ) {
		hash = ( ( hash << 5 ) - hash ) + str.charCodeAt( i );
		hash |= 0;
	}

	// Convert the possibly negative integer hash code into an 8 character hex string, which isn't
	// strictly necessary but increases user understanding that the id is a SHA-like hash
	let hex = ( 0x100000000 + hash ).toString( 16 );
	if ( hex.length < 8 ) {
		hex = "0000000" + hex;
	}

	return hex.slice( -8 );
}
