import React, { useEffect, useState } from "react";


export default function TextFileReader(props) {
  const [ text, setText ] = useState('')


	useEffect(() => {
		readTextFile(props.txt);
  })

	function readTextFile(file)  {
		var rawFile = new XMLHttpRequest();
		rawFile.open("GET", file, false);
		rawFile.onreadystatechange = () => {
			if (rawFile.readyState === 4) {
				if (rawFile.status === 200 || rawFile.status == 0) {
					var allText = rawFile.responseText;
					setText(allText);
				}
			}
		};
		rawFile.send(null);
	};

  return (
			<div>
				{text.split("\n").map((item, key) => {
					return <span key={key}>{item}<br /></span>;
				})}
			</div>
		);

}