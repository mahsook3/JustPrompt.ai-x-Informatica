import { MongoClient } from "mongodb";
import { ObjectId } from "mongodb";
import dotenv from 'dotenv';
import Joi from 'joi';

dotenv.config();
const uri = process.env.ATLAS_CONNECTION_STRING_ramya;
const client = new MongoClient(uri);

const database = client.db("justprompt");
const templateCollection = database.collection("template-data");

const themeSchema = Joi.object({
    dark: Joi.boolean().required(),
    primaryColor: Joi.string().pattern(/^#[0-9A-Fa-f]{6}$/).required()
}).required();

const navigationSchema = Joi.array().items(Joi.object({
    title: Joi.string().required(),
    path: Joi.string().required()
})).required();

const buttonSchema = Joi.object({
    text: Joi.string().required(),
    href: Joi.string().required()
}).required();

const heroSchema = Joi.object({
    title: Joi.string().required(),
    subtitle: Joi.string().required(),
    primarybutton: buttonSchema.required(),
    secondarybutton: buttonSchema.required()
}).required();

const statSchema = Joi.object({
    value: Joi.string().required(),
    label: Joi.string().required()
}).required();

const featureSchema = Joi.object({
    icon: Joi.string().required(),
    title: Joi.string().required(),
    description: Joi.string().required()
}).required();

const featuresSchema = Joi.object({
    title: Joi.string().required(),
    subtitle: Joi.string().required(),
    features: Joi.array().items(featureSchema).required()
}).required();

const imageSchema = Joi.object({
    src: Joi.string().uri().required(),
    alt: Joi.string().required()
}).required();

const aboutUsSchema = Joi.object({
    image: imageSchema.required(),
    title: Joi.string().required(),
    subtitle: Joi.string().required(),
    description: Joi.string().required(),
    linkText: Joi.string().required()
}).required();

const ctaSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    buttons: Joi.array().items(buttonSchema).required()
}).required();

const testimonialSchema = Joi.object({
    avatar: Joi.string().uri().required(),
    name: Joi.string().required(),
    title: Joi.string().required(),
    quote: Joi.string().required()
}).required();

const testimonialsSectionSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    testimonials: Joi.array().items(testimonialSchema).required()
}).required();

const socialLinkSchema = Joi.object({
    platform: Joi.string().required(),
    href: Joi.string().allow('').required(),
    icon: Joi.string().required()
}).required();

const sectionSchema = Joi.object({
    title: Joi.string().required(),
    links: Joi.array().items(Joi.object({
        text: Joi.string().required(),
        href: Joi.string().allow('').required()
    })).required()
}).required();

const contactSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
}).required();

const footerSchema = Joi.object({
    logo: imageSchema.required(),
    description: Joi.string().required(),
    socialLinks: Joi.array().items(socialLinkSchema).required(),
    sections: Joi.array().items(sectionSchema).required(),
    contact: contactSchema.required(),
    copyright: Joi.string().required()
}).required();

const productSchema = Joi.object({
    id: Joi.number().required(),
    name: Joi.string().required(),
    price: Joi.number().required(),
    rating: Joi.number().min(0).max(5).required(),
    image: Joi.string().uri().required(),
    category: Joi.string().required(),
    minOrder: Joi.number().required(),
    isNew: Joi.boolean().required(),
    discount: Joi.string().required(),
    originalPrice: Joi.number().required()
}).required();

const logoSchema = Joi.object({
    src: Joi.string().uri().required(),
    width: Joi.number().required(),
    height: Joi.number().required(),
    alt: Joi.string().required()
}).required();

const brandSchema = Joi.object({
    src: Joi.string().uri().required(),
    alt: Joi.string().required()
}).required();

const requestSchema = Joi.object({
    theme: themeSchema,
    navigation: navigationSchema,
    hero: heroSchema,
    stats: Joi.array().items(statSchema).required(),
    features: featuresSchema,
    aboutUs: aboutUsSchema,
    cta: ctaSchema,
    testimonialsSection: testimonialsSectionSchema,
    footer: footerSchema,
    products: Joi.array().items(productSchema).required(),
    logo: logoSchema,
    brands: Joi.array().items(brandSchema).required()
}).required();

export async function posttemplateDetails(details) {
    const { error, value } = requestSchema.validate(details, { abortEarly: false });

    if (error) {
        console.log('Validation error details:', error.details);
        const validationDetails = error.details.map(detail => `${detail.path.join('.')} Validation failed`);
        return {
            success: false,
            message: `Validation failed: ${validationDetails.join(', ')}`,
            details: validationDetails
        };
    }

    try {
        await client.connect();

        // Create a document to insert
        const document = {
            ...value,
            "Submission Date & Time": new Date().toISOString().slice(0, 19)
        };

        // Insert the document into the collection
        const result = await templateCollection.insertOne(document);
        return {
            success: true,
            message: "Details added successfully",
            insertedId: result.insertedId
        };
    } catch (err) {
        console.error(err);
        return {
            success: false,
            message: "Internal Server Error",
            error: err.message
        };
    } finally {
        await client.close();
    }
}

export async function getTemplateDetailsById(id) {
    try {
        await client.connect();
        const document = await templateCollection.findOne({ _id: new ObjectId(id) });

        if (!document) {
            return {
                success: false,
                message: "Template not found"
            };
        }

        return {
            success: true,
            message: "Template details retrieved successfully",
            data: document
        };
    } catch (err) {
        console.error(err);
        return {
            success: false,
            message: "Internal Server Error",
            error: err.message
        };
    } finally {
        await client.close();
    }
}