import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    line: {
        whiteSpace: 'pre',
    },
}))


export default function TextFileReader(props) {
  const [ text, setText ] = useState('')
  const classes = useStyles();

	useEffect(() => {
		readTextFile(props.txt);
	})

	function readTextFile(file)  {
		var rawFile = new XMLHttpRequest();
		rawFile.open("GET", file, false);
		rawFile.onreadystatechange = () => {
			if (rawFile.readyState === 4) {
				if (rawFile.status === 200 || rawFile.status === 0) {
					var allText = rawFile.responseText;
					setText(allText);
				}
			}
		};
		rawFile.send(null);
	};

  return (
    <>
      {
        text.split("\n").map((item, key) => {
          return <span className={classes.line} key={key}>{item}<br /></span>;
        })
      }
    </>);

}