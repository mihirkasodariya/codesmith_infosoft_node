import {
    enterpriseLogoValidation,
    idValidation,
    homeEnterpriseModel,
} from "../models/enterpriseModel.js";
import response from "../utils/response.js";
import { resStatusCode, resMessage } from "../utils/constants.js";

export const addEnterpriseLogo = async (req, res) => {
    const image = req?.file?.filename
    const { error } = enterpriseLogoValidation.validate({ image });
    if (error) {
        return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
    };
    try {
        const addEnterpriseLogo = await homeEnterpriseModel.create({
            image,
        });
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.ADD_ENTERPRISE_LOGO, addEnterpriseLogo);
    } catch (error) {
        console.error('Error in addEnterpriseLogo:', error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export const getAllEnterpriseLogo = async (req, res) => {
    try {
        const getAllLogo = await homeEnterpriseModel.find({ isActive: true }).sort({ createdAt: -1 });
        const chnageLogoResponse = getAllLogo.map((logo) => ({
            ...logo._doc,
            image: `/enterpriseLogo/${logo.image}`,
        }));
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.LOGO_LIST, chnageLogoResponse);
    } catch (error) {
        console.error('Error in getAllEnterpriseLogo:', error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};

export const deleteEnterpriseLogo = async (req, res) => {
    const { id } = req?.params;
    const { error } = idValidation.validate({ id });
    if (error) {
        return response.error(res, resStatusCode.CLIENT_ERROR, error.details[0].message, {});
    };
    try {
        await homeEnterpriseModel.findByIdAndUpdate(
            { _id: id },
            { isActive: false },
            { new: false }
        );
        return response.success(res, resStatusCode.ACTION_COMPLETE, resMessage.DELETE_LOGO, {});
    } catch (error) {
        console.error('Error in deleteEnterpriseLogo:', error);
        return response.error(res, resStatusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR, {});
    };
};