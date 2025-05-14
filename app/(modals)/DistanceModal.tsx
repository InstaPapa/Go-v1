import { View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import { Modal } from 'react-native';

const { width } = Dimensions.get('window');

interface DistanceModalProps {
    isVisible: boolean;
    distance: string;
    onSave: () => void;
    onDistanceChange: (text: string) => void;
    onRequestClose: () => void;
}

export default function DistanceModal({
    isVisible,
    distance,
    onSave,
    onDistanceChange,
    onRequestClose
}: DistanceModalProps) {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={onRequestClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Установите дистанцию</Text>
                    
                    <View style={styles.modalDistanceWrapper}>
                        <TextInput
                            style={styles.modalDistanceInput}
                            value={distance}
                            onChangeText={onDistanceChange}
                            keyboardType="numeric"
                            autoFocus={true}
                            placeholder="0.00"
                        />
                        <View style={styles.modalDivider} />
                        <Text style={styles.modalDistanceUnit}>км</Text>
                    </View>

                    <TouchableOpacity 
                        style={styles.modalSaveButton}
                        onPress={onSave}
                    >
                        <Text style={styles.modalSaveButtonText}>Сохранить</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: width * 0.85,
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 25,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 25,
        color: '#333',
    },
    modalDistanceWrapper: {
        alignItems: 'center',
        marginBottom: 30,
    },
    modalDistanceInput: {
        fontSize: 48,
        fontWeight: '300',
        color: '#000',
        textAlign: 'center',
        width: 150,
    },
    modalDivider: {
        width: 100,
        height: 2,
        backgroundColor: '#000',
        marginVertical: 8,
    },
    modalDistanceUnit: {
        fontSize: 20,
        color: '#888',
        marginTop: 8,
    },
    modalSaveButton: {
        backgroundColor: '#000',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 25,
    },
    modalSaveButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
});