/**
 * @class AssetLoader
 * @description Javascript asset loader
 * @param assets (array) Assets array
 * @param options (object) Configuration object (seq: true/false)
 * @return Promise object
 * 
 * Example:
 * 
 * new AssetLoader([ 'img1.jpg', 'img2.jpg' ], {type: 'img', seq: true}).then(function() { alert('images loaded!'); });
 * new AssetLoader([ 'audio1.ogg', 'audio2.mp3' ], {type: 'audio', load: 'loadeddata'}).then(function() { alert('audio loaded!'); });
 */

(function() {
	var Asset = function(src, options) {
		return new Promise(function(resolve, reject) {
			var el = document.createElement(options.type || 'img');
			el.setAttribute(options.attr || 'src', src);
			el.addEventListener(options.load || 'load', function() {
				resolve(this);
			});
			el.addEventListener(options.error || 'error',function() {
				reject(this);
			});
		});
	};
	
	this.AssetLoader = function(assets, options) {
		var elems=[];
		(!options) && (options={});
		
		if (!options.seq)
			result = Promise.all(
				assets.map(function(v) {
					return new Asset(v, options);
				})
			);
		else
			return new Promise(
				function(resolve, reject) {
					(assets.reduce(function(last, url) {
						return last.then(function(el) {
							(arguments.length) && (elems.push(el));
							return new Asset(url, options);
						});
					}, Promise.resolve())).then(
						function(el) {
							elems.push(el);
							resolve(elems);
						},
						function(el) {
							elems.push(el);
							reject(elems);
						}
					)
				}
			);
	};
}).call(this);
