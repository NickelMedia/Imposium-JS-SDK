 if npm list -s -g | grep dts-generator > /dev/null 2>&1; then
 	# See https://github.com/SitePen/dts-generator for list of paramaters
	dts-generator --name Imposium-JS-SDK \
		--project ./ \
		--out ./index.d.ts
else 
	echo -e "Package dts-generator is not installed globally, please run the following:\nnpm i -g dts-generator"
fi