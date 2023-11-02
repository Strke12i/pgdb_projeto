import { Modal, View, Text, StyleSheet } from "react-native";
import { CancelButton } from "./CancelButton";

export const ModalComponent = (props: any) => {
    return(
        <Modal
		  	animationType='fade'
		  	transparent={true}
			visible={props.visible}
			style={styles.modalView}
            onRequestClose={() => props.setVisible(false)}
			>
				<View style={styles.modalView}>
					<View style={styles.cancal_button}>
					    <CancelButton onPress={() => props.setVisible(false)}/>
					</View>
					{
                        props.children
                    }
				</View>
				
			</Modal>
    )
}

const styles = StyleSheet.create({
    modalView: {
        margin: 20,
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        borderRadius: 20,
        padding: 35,
        height: 500,
        alignItems: 'center',
        shadowColor: '#000',
        marginTop: 120,
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 5,
    },
    cancal_button: {
        position:"absolute",
        right:0,
        top:-8
    },
});