import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row', // Change flex direction to row
    justifyContent: 'center',
    padding: '16px',
  },
  column: {
    flex: 1, // Equal width for both columns
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title2: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: '30px', // Add margin top
    marginBottom: '20px', // Reduce margin bottom
    marginRight: '530px'
  },
  title3: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: '20px', // Add margin top
    marginBottom: '20px', // Reduce margin bottom
    marginRight: '270px'
  },
  title1: {
    textAlign: 'center',
    marginTop: '20px',
    marginBottom: '60px'
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '16px',
    flexWrap: 'wrap',
  },
  buttonGroup2: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '30px',
    flexWrap: 'wrap',
  },
  button: {
    textTransform: 'capitalize',
    margin: '0 8px',
    width: '150px',
  },
  messageContainer: {
    position: 'fixed', // Change to fixed
    top: '16px',
    right: '16px',
    backgroundColor: '#f0f0f0',
    padding: '8px',
    borderRadius: '4px',
  },
  catalogItem1: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '15px',
    margin: '0 15px 15px 15px', // Adjusted margin to reduce vertical gap
  },
  catalogItem2: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '5px', // Increased margin for more vertical gap
    margin: '0 15px 15px 15px', // Adjusted margin to reduce vertical gap
  },
  catalogImageContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center', // Align items to center
  },
  bulletCircle: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: '#000',
    display: 'inline-block',
    marginRight: '50px',
  },
  catalogImage: {
    width: 'auto',
    height: '80%',
    marginBottom: '10px',
  },
  rowContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
    margin: '10px 0', // Adjust margin for row spacing
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginRight: '925px',
    marginTop: '16px',
  },
  baseCatalogContainer: {
    maxHeight: '400px', // Adjust height as needed
    overflowY: 'auto',
  },
}));

const RuleCatalogPage = () => {
  const classes = useStyles();
  const baseCatalogRef = useRef(null); // Ref for the "Base Catalog -" section

  const [ruleSets, setRuleSets] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [selectedImageText, setSelectedImageText] = useState(null);
  const [disabledButtons, setDisabledButtons] = useState(["Manufacturing", "Pharma", "Retail"]);
  const [moreInfoDisabled, setMoreInfoDisabled] = useState(true);
  const [useCustomizeDisabled, setUseCustomizeDisabled] = useState(true);

  useEffect(() => {
    // Fetch data from JSON file
    fetch('Comprule.json')
      .then(response => response.json())
      .then(data => setRuleSets(data))
      .catch(error => console.error('Error fetching rule sets:', error));
  }, []);

  const scrollToBaseCatalog = () => {
    baseCatalogRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleButtonClick = (imageText, isButton) => {
    // Check if the click was on a button
    if (isButton) {
      setSelectedImageText(imageText);
    } else {
      setSelectedImageText(null); // Clear message if clicked on an image
    }
  };

  return (
    <>
      <Typography variant="h4" className={classes.title1}>
        Rule Catalog
      </Typography>
      <div className={classes.buttonContainer}>
        <div className={classes.buttonGroup}>
          <Button variant="contained" color="primary" className={classes.button} onClick={() => handleButtonClick("Custom: Default", true)}>
            Custom
          </Button>
          <div style={{ width: '30px' }} /> {/* Added space */}
          <Typography variant="body1">
            OR
          </Typography>
          <div style={{ width: '30px' }} /> {/* Added space */}
          <Typography variant="body1">
            Choose from an option below
          </Typography>
        </div>
      </div>
      <div className={classes.root}>
        <div className={classes.column}>
          <Typography variant="h6" className={classes.title2}>
            Available Catalogs -
          </Typography>
          <div className={classes.buttonGroup}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              {ruleSets.slice(0, 4).map(ruleSet => (
                <div key={ruleSet.id} className={classes.catalogItem1}>
                  <img
                    src={ruleSet.image}
                    alt={ruleSet.image_text}
                    className={classes.catalogImage}
                    onClick={() => handleButtonClick(ruleSet.image_text, false)}
                  />
                  <Typography variant="body1">{ruleSet.image_text}</Typography>
                  {(ruleSet.id !== "B1" && ruleSet.id !== "B14") && (
                    <Button
                      variant="contained"
                      color="primary"
                      href={ruleSet.button_url}
                      className={classes.button}
                      onClick={() => handleButtonClick(ruleSet.image_text, true)}
                      style={{ position: 'sticky', marginTop: '20px' }}
                      disabled={disabledButtons.includes(ruleSet.image_text)}
                    >
                      Add New
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ borderLeft: '1px solid #ccc', margin: '0 20px' }}></div> {/* Vertical line */}
        <div className={classes.column}>
          <div className={classes.baseCatalogContainer} ref={baseCatalogRef}>
            <Typography variant="h6" className={classes.title3}>
              Base Catalogs -
            </Typography>
            <div className={classes.rowContainer}>
              {ruleSets.slice(4, showMore ? ruleSets.length : 8).reduce((rows, ruleSet, index, array) => {
                if (index % 2 === 0) rows.push(array.slice(index, index + 2));
                return rows;
              }, []).map((row, rowIndex) => (
                <div key={rowIndex} className={classes.row}>
                  {row.map(ruleSet => (
                    <div key={ruleSet.id} className={classes.catalogItem2}>
                      <div className={classes.catalogImageContainer}>
                        <span className={classes.bulletCircle}></span> {/* Bullet circle */}
                        <img
                          src={ruleSet.image}
                          alt={ruleSet.image_text}
                          className={classes.catalogImage}
                          onClick={() => handleButtonClick(ruleSet.image_text, false)}
                        />
                      </div>
                      <Typography variant="body1">{ruleSet.image_text}</Typography>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            {!showMore && (
              <Typography variant="body1" style={{ cursor: 'pointer', color: 'blue',textAlign:'center' }} onClick={() => { setShowMore(true); scrollToBaseCatalog(); }}>
                Load (10) more
              </Typography>
            )}
          </div>
          <div className={classes.buttonGroup2}>
            <Button variant="contained" color="primary" className={classes.button} disabled={moreInfoDisabled}>
              More Info
            </Button>
            <Button variant="contained" color="primary" className={classes.button} disabled={useCustomizeDisabled}>
              Use/Customize
            </Button>
          </div>
        </div>
        {selectedImageText && (
          <div className={classes.messageContainer}>
            <Typography variant="body1">You are adding a new rule for: {selectedImageText}</Typography>
          </div>
        )}
      </div>
    </>
  );
};

export default RuleCatalogPage;
