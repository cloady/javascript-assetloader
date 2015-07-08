/**
 * @class AssetLoader
 * @description Javascript asset loader
 * @param assets (array) Assets array
 * @param options (object) Configuration object (reduce: true/false)
 * @return Promise object
 * 
 * Example:
 * 
 * new AssetLoader([ 'img1.jpg', 'img2.jpg' ], {type: 'img', reduce: true}).then(function() { alert('images loaded!'); });
 * new AssetLoader([ 'audio1.ogg', 'audio2.mp3' ], {type: 'audio', load: 'loadeddata'}).then(function() { alert('audio loaded!'); });
 */

(function() {
	var Asset = function(src, options) {
		return new Promise(function(resolve, reject) {
			var el = document.createElement(options.type || 'img');
			el.setAttribute(options.attr || 'src', src);
			el.addEventListener(options.load, function() {
				resolve(this);
			});
			el.addEventListener(options.error,function() {
				reject(this);
			});
		});
	};
	
	this.AssetLoader = function(assets, options) {
		(!options) && (options={});
		
		if (!options.reduce)
			return Promise.all(
				assets.map(function(v) {
					return new Asset(v, options);
				})
			);
		else
			return assets.reduce(function(last, url) {
				return last.then(function() {
					return new Asset(url, options);
				});
			}, Promise.resolve())
	};
}).call(this);
