/**
 * @class AssetLoader
 * @description Javascript asset loader
 * @param assets (array) Assets array
 * @param options (object) Configuration object (reduce: true/false)
 * @return Promise object
 * 
 * Example:
 * 
 * new AssetLoader([ 'img1.jpg', 'img2.jpg' ], {reduce: true}).then(function() { alert('images loaded!'); });
 */

(function() {
	var ImageAsset = function(src) {
		return new Promise(function(resolve, reject) {
			var img = new Image;
			img.src = src;
			img.onload = function() {
				resolve(img);
			};
			img.onerror = function() {
				reject(img);
			}
		});
	};
	
	this.AssetLoader = function(assets, options) {
		(!options) && (options={});
		
		if (!options.reduce)
			return Promise.all(
				assets.map(function(v) {
					return new ImageAsset(v);
				})
			);
		else
			return assets.reduce(function(last, url) {
				return last.then(function() {
					return new ImageAsset(url);
				});
			}, Promise.resolve())
	};
}).call(this);
