/// <reference path="../ref.ts" />

class GuidTest extends UnitTestClass {

	GuidTestNewGuidTest() : void {
		// Arrange
		var outcome : string;
		var charSet : string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

		// Act
		outcome = Guid.newGuid();

		// Assert
		for (var i = 0; i < 32; i++) {
			if (i === 8 || i === 13 || i === 18 || i === 23) {
				Assert.areEqual('-', outcome.charAt(i));
			} else {
				var b : boolean = false;
				for (var j = 0; j < charSet.length && !b; j++) {
					if (outcome.charAt(i) === charSet.charAt(j)) {
						b = true;
					}
				}
				Assert.isTrue(b);
			}
		}
	}
}
