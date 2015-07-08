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
 * new AssetLoader([ 'script1.js', 'script2.js' ], {type: 'script'}).then(function() { alert('script loaded!'); });
 * new AssetLoader([ 'audio1.ogg', 'audio2.mp3' ], {type: 'audio', load: 'loadeddata'}).then(function() { alert('audio loaded!'); });
 * new AssetLoader([ 'style1.css', 'style2.css' ], {type: 'link', attr: 'href', async: false});
 */

(function() {
	var Asset = function(src, options) {
		return new Promise(function(resolve, reject) {
			var el = document.createElement(options.type);
			el.setAttribute(options.attr, src);
			if (options.async) {
				el.addEventListener(options.load, function() {
					resolve(this);
				});
				el.addEventListener(options.error,function() {
					reject(this);
				});
			}
			else { 
				resolve(el);
			}
		});
	};
	
	this.AssetLoader = function(assets, options) {
		(!options) && (options={type: 'img', attr: 'src', async: true, attrs: [], load: 'load', error: 'error', reduce: false});
		
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
