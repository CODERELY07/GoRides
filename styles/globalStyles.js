import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: "#F0F4F8",
    justifyContent: "center",
    },
    boxContainer: {
    width: "85%",
    marginHorizontal: "auto",
    borderRadius: 10,
    padding: 20,
    },
    bold: {
    fontWeight: "bold",
    },
    big: {
    fontSize: 20,
    },
    input: {
    borderWidth: 1,
    padding: 6,
    borderRadius: 6,
    borderColor: "rgba(0,0,0,0.1)",
    paddingHorizontal: 15,
    marginTop: 8,
    },
    smallText: {
    fontSize: 12,
    color: "rgba(0,0,0,0.5)",
    },
    loginButtons: {
    borderWidth: 1,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    borderRadius: 6,
    borderColor: "rgba(0,0,0,0.1)",
    marginTop: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
    },
    loginButtonText: {
    textAlign: "center",
    },
    profileTextHolder: {
    marginLeft: 10,
    },
    inlineContainer: {
    flexDirection: "row",
    alignItems: "center",
    },
    locatonSearchContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
    },
    applyRidersContainer: {
    marginTop: 20,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    padding: 15,
    borderRadius: 8,
    },
    profile: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#D0D0D0",
    },

    // Homescreen
    homeScreenContainer: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: "#FAFAFA",
    paddingHorizontal: 20,
    },
    backIcon: {
    marginVertical: 20,
    },
    header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#4A90E2",
    padding: 10,
    borderRadius: 8,
    },
    locatonSearchContainer: {
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    paddingBottom: 40,
    },
    profileTextHolder: {
    marginLeft: 10,
    color: "#FFFFFF",
    },
    boxShadows: {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
    },
    inlineSpaceBetween: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    justifyContent: "space-between",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
    paddingBottom: 5,
    },
    applyButton: {
    backgroundColor: "#4A90E2",
    borderRadius: 8,
    width: 50,
    padding: 5,
    paddingVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    },
    whiteColor: {
    color: "#fff",
    },
    arrowButton: {
    marginLeft: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    position: "absolute",
    right: 0,
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: "rgba(0,0,0,0.1)",
    borderRadius: 8,
    },
    errorMessage:{
        color:'#F95454',
        fontSize:13,
    },
    textCenter:{
        textAlign:'center',
        marginTop:10,
    },
    rideItemContainer:{
        paddingTop:20,
    },
    riderButton:{
        padding:8,
        borderRadius:8,
        marginRight:10,
        marginTop:10,
        justifyContent:"center",
        alignItems:"center",
        marginBottom:10,
    }
});
