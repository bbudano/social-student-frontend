export default {
    palette: {
        primary: {
            light: '#4dabf5',
            main: '#2196f3',
            dark: '#1769aa',
            contrastText: '#fff'
        },
        secondary: {
            light: '#f6734b',
            main: '#f4511e',
            dark: '#aa3815',
            contrastText: '#fff'
        },
    },
    spreadObject: {
        typography: {
            useNextVariants: true
        },
        form: {
            textAlign: 'center'
        },
        image: {
          margin: '20px auto 20px auto'
        },
        pageTitle: {
            margin: '10px auto 10px auto'
        },
        textField: {
            margin: '10px auto 10px auto'
        },
        button: {
            marginTop: 20,
            position: 'relative'
        },
        progress: {
            position: 'absolute'
        },
        paper: {
            padding: 20
        },
        profile: {
            '& .image-wrapper': {
                textAlign: 'center',
                position: 'relative',
                '& button': {
                    position: 'absolute',
                    top: '80%',
                    left: '70%'
                }
            },
            '& .profile-image': {
                width: 200,
                height: 200,
                objectFit: 'cover',
                maxWidth: '100%',
                borderRadius: '50%'
            },
            '& .profile-details': {
                textAlign: 'center',
                '& span, svg': {
                    verticalAlign: 'middle'
                },
                '& a': {
                    color: '#2196f3'
                }
            },
            '& hr': {
                border: 'none',
                margin: '0 0 10px 0'
            },
            '& svg.button': {
                '&:hover': {
                    cursor: 'pointer'
                }
            }
        },
        buttons: {
            textAlign: 'center',
            '& a': {
                margin: '20px 10px'
            }
        },
        invisibleHorizontalRuler: {
            border: 'none',
            margin: 4
        },
        visibleHorizontalRuler: {
            width: '100%',
            borderBottom: '1px solid rgba(0,0,0,0.1)',
            marginBottom: 20
        },
        adminButton: {
            marginTop: 25
        }
    }
}